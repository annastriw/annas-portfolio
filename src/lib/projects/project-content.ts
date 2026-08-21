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

  return {
    valid: allIssues.length === 0,
    total: mdFilenames.length,
    projects,
    issues: allIssues,
  };
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
    const filePath = path.join(PROJECTS_DIRECTORY, `${metadata.slug}.md`);
    const rawContent = await fs.readFile(filePath, "utf8");
    const parsed = matter(rawContent);

    projects.push({
      slug: metadata.slug,
      metadata,
      content: parsed.content,
    });
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
    return {
      slug,
      metadata,
      content: parsed.content,
    };
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as { code: string }).code === "ENOENT"
    ) {
      return null;
    }
    throw err;
  }
}
