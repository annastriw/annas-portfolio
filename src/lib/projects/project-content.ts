import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type {
  ContentValidationIssue,
  Project,
  ProjectMetadata,
  RawProjectFrontmatter,
} from "./project-types";
import { validateProjectRecord } from "./project-schema";
import { normalizeProjectFrontmatter } from "./project-normalizer";

const PROJECTS_DIRECTORY = path.join(process.cwd(), "content", "projects");
const ASSETS_BASE_DIRECTORY = path.join(process.cwd(), "public", "assets", "projects");

let cachedValidationResult: {
  valid: boolean;
  total: number;
  projects: ProjectMetadata[];
  issues: ContentValidationIssue[];
} | null = null;

const projectDetailCache = new Map<string, Project | null>();
const projectAssetsCache = new Map<string, string[]>();

/**
 * Clears in-memory caches for testing or content re-validation.
 */
export function clearProjectContentCache(): void {
  cachedValidationResult = null;
  projectDetailCache.clear();
  projectAssetsCache.clear();
}

/**
 * Validates all markdown project files in the content/projects directory.
 * Returns validation status, list of issues (if any), and parsed project metadata.
 */
export async function validateAllProjects(): Promise<{
  valid: boolean;
  total: number;
  projects: ProjectMetadata[];
  issues: ContentValidationIssue[];
}> {
  if (cachedValidationResult) {
    return cachedValidationResult;
  }
  const fileEntries = await fs.readdir(PROJECTS_DIRECTORY, { withFileTypes: true });
  const mdFilenames = fileEntries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name)
    .sort();

  const allIssues: ContentValidationIssue[] = [];
  const projects: ProjectMetadata[] = [];
  const knownSlugs = new Set<string>();

  for (const filename of mdFilenames) {
    const filePath = path.join(PROJECTS_DIRECTORY, filename);
    const rawContent = await fs.readFile(filePath, "utf8");

    try {
      const parsed = matter(rawContent);
      const rawFm = parsed.data as RawProjectFrontmatter;
      const body = parsed.content;

      const issues = validateProjectRecord(
        filename,
        rawFm,
        body,
        ASSETS_BASE_DIRECTORY,
        knownSlugs,
      );

      if (issues.length > 0) {
        allIssues.push(...issues);
      } else {
        const metadata = normalizeProjectFrontmatter(rawFm);
        projects.push(metadata);
      }
    } catch (err: unknown) {
      allIssues.push({
        filename,
        message: `Failed to parse YAML frontmatter: ${err instanceof Error ? err.message : String(err)}`,
      });
    }
  }

  // Sort projects deterministically by slug
  projects.sort((a, b) => a.slug.localeCompare(b.slug));

  const result = {
    valid: allIssues.length === 0,
    total: mdFilenames.length,
    projects,
    issues: allIssues,
  };

  cachedValidationResult = result;
  return result;
}

/**
 * Returns all project slugs deterministically.
 */
export async function getProjectSlugs(): Promise<string[]> {
  const validation = await validateAllProjects();
  if (!validation.valid) {
    const errorDetails = validation.issues
      .map((i) => `[${i.filename}${i.field ? `:${i.field}` : ""}]: ${i.message}`)
      .join("\n");
    throw new Error(`Content validation failed during getProjectSlugs:\n${errorDetails}`);
  }
  return validation.projects.map((p) => p.slug);
}

/**
 * Returns all normalized project metadata without full markdown bodies (lightweight for lists/previews).
 */
export async function getAllProjectMetadata(): Promise<ProjectMetadata[]> {
  const validation = await validateAllProjects();
  if (!validation.valid) {
    const errorDetails = validation.issues
      .map((i) => `[${i.filename}${i.field ? `:${i.field}` : ""}]: ${i.message}`)
      .join("\n");
    throw new Error(`Content validation failed during getAllProjectMetadata:\n${errorDetails}`);
  }
  return validation.projects;
}

/**
 * Returns all full project models including their parsed body markdown content.
 */
export async function getAllProjects(): Promise<Project[]> {
  const validation = await validateAllProjects();
  if (!validation.valid) {
    const errorDetails = validation.issues
      .map((i) => `[${i.filename}${i.field ? `:${i.field}` : ""}]: ${i.message}`)
      .join("\n");
    throw new Error(`Content validation failed during getAllProjects:\n${errorDetails}`);
  }

  const projects: Project[] = [];
  for (const metadata of validation.projects) {
    const project = await getProjectBySlug(metadata.slug);
    if (project) {
      projects.push(project);
    }
  }

  return projects;
}

/**
 * Returns a single project by its slug, or null if not found.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!slug || typeof slug !== "string" || slug.includes("..") || slug.includes("/")) {
    return null;
  }

  if (projectDetailCache.has(slug)) {
    return projectDetailCache.get(slug)!;
  }

  const filePath = path.join(PROJECTS_DIRECTORY, `${slug}.md`);
  try {
    const rawContent = await fs.readFile(filePath, "utf8");
    const parsed = matter(rawContent);
    const rawFm = parsed.data as RawProjectFrontmatter;

    const issues = validateProjectRecord(
      `${slug}.md`,
      rawFm,
      parsed.content,
      ASSETS_BASE_DIRECTORY,
      new Set<string>(),
    );

    if (issues.length > 0) {
      const errorDetails = issues
        .map((i) => `[${i.filename}${i.field ? `:${i.field}` : ""}]: ${i.message}`)
        .join("\n");
      throw new Error(`Content validation failed for project "${slug}":\n${errorDetails}`);
    }

    const metadata = normalizeProjectFrontmatter(rawFm);
    const project: Project = {
      slug,
      metadata,
      content: parsed.content,
    };
    projectDetailCache.set(slug, project);
    return project;
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as { code: string }).code === "ENOENT"
    ) {
      projectDetailCache.set(slug, null);
      return null;
    }
    throw err;
  }
}

/**
 * Returns available local static asset paths for a project deterministically.
 */
export async function getProjectAssets(slug: string): Promise<string[]> {
  if (!slug || typeof slug !== "string" || slug.includes("..") || slug.includes("/")) {
    return [];
  }

  if (projectAssetsCache.has(slug)) {
    return projectAssetsCache.get(slug)!;
  }

  const projectAssetDir = path.join(ASSETS_BASE_DIRECTORY, slug);
  try {
    const entries = await fs.readdir(projectAssetDir, { withFileTypes: true });
    const imageFiles = entries
      .filter((entry) => entry.isFile() && /\.(webp|png|jpg|jpeg|svg)$/i.test(entry.name))
      .map((entry) => `/assets/projects/${slug}/${entry.name}`)
      .sort();
    projectAssetsCache.set(slug, imageFiles);
    return imageFiles;
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as { code: string }).code === "ENOENT"
    ) {
      projectAssetsCache.set(slug, []);
      return [];
    }
    throw err;
  }
}

/**
 * Returns adjacent (previous and next) projects based on deterministic ordering.
 */
export async function getAdjacentProjects(slug: string): Promise<{
  prev: ProjectMetadata | null;
  next: ProjectMetadata | null;
}> {
  const allProjects = await getAllProjectMetadata();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return { prev, next };
}
