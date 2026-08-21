/**
 * Project Content Layer Types
 * Strictly represents raw frontmatter and normalized project domain models.
 */

export interface RawProjectFrontmatter {
  judul?: string;
  slug?: string;
  jenis?: string;
  jenis_project?: string;
  peran?: string;
  role?: string;
  stakeholder?: string;
  client?: string;
  organisasi?: string;
  tim?: string;
  status?: string;
  periode?: string;
  durasi?: string;
  lokasi?: string;
  primary_tool?: string;
  fokus?: string;
  divisi?: string;
  platform?: string;
  bahasa_utama?: string;
  model_utama?: string;
  live_domain?: string;
  asset_path?: string;
  [key: string]: unknown;
}

export type ProjectKind = "Project" | "Internship" | "Work";

export interface ProjectMetadata {
  slug: string;
  title: string;
  kind: ProjectKind;
  projectType: string;
  role: string;
  stakeholder: string | null;
  status: string | null;
  period: string | null;
  duration: string | null;
  location: string | null;
  liveUrl: string | null;
  assetPath: string | null;
  raw: RawProjectFrontmatter;
}

export interface Project {
  slug: string;
  metadata: ProjectMetadata;
  content: string;
}

export interface ContentValidationIssue {
  filename: string;
  field?: string;
  message: string;
}

export interface ContentValidationResult {
  valid: boolean;
  issues: ContentValidationIssue[];
}
