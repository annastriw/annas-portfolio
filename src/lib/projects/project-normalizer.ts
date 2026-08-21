import type {
  ProjectKind,
  ProjectMetadata,
  RawProjectFrontmatter,
} from "./project-types";

/**
 * Normalizes raw frontmatter into a clean, strongly typed ProjectMetadata domain model.
 * Preserves all factual content while standardizing property access.
 */
export function normalizeProjectFrontmatter(
  raw: RawProjectFrontmatter,
): ProjectMetadata {
  const slug = String(raw.slug || "").trim();
  const title = String(raw.judul || "").trim();

  // Normalize kind
  let kind: ProjectKind = "Project";
  if (raw.jenis === "Internship" || raw.jenis_project?.toLowerCase().includes("internship")) {
    kind = "Internship";
  } else if (raw.jenis === "Work") {
    kind = "Work";
  }

  // Normalize project type / specialization
  const projectType =
    raw.jenis_project?.trim() ||
    raw.fokus?.trim() ||
    (kind === "Internship" ? "Internship Development" : "Software Engineering");

  // Normalize role
  const role = raw.peran?.trim() || raw.role?.trim() || "Developer";

  // Normalize stakeholder / client / organization
  const stakeholder =
    raw.stakeholder?.trim() ||
    raw.client?.trim() ||
    raw.organisasi?.trim() ||
    null;

  // Normalize status
  const status = raw.status?.trim() || null;

  // Normalize period / duration / location
  const period = raw.periode?.trim() || null;
  const duration = raw.durasi?.trim() || null;
  const location = raw.lokasi?.trim() || null;

  // Normalize live domain / URL
  const liveUrl = raw.live_domain?.trim() || null;

  // Normalize asset path (e.g. "assets/projects/foo/" -> "/assets/projects/foo/")
  let assetPath: string | null = null;
  if (raw.asset_path && raw.asset_path.trim().length > 0) {
    const rawPath = raw.asset_path.trim();
    assetPath = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
    if (!assetPath.endsWith("/")) {
      assetPath = `${assetPath}/`;
    }
  }

  return {
    slug,
    title,
    kind,
    projectType,
    role,
    stakeholder,
    status,
    period,
    duration,
    location,
    liveUrl,
    assetPath,
    raw,
  };
}
