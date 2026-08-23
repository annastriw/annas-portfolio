import type { Locale } from "@/lib/i18n/config";

export type ProjectCategory = "web-app" | "ml" | "mobile" | "other";

export interface ProjectTechnicalSpec {
  core: string[];
  architecture?: string[];
  qaOrDeployment?: string[];
}

export interface ProjectMetric {
  label: Record<Locale, string>;
  value: string;
}

export interface ProjectFeatureModule {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
}

export interface ProjectItem {
  slug: string;
  category: ProjectCategory;
  order: number;
  featured: boolean;

  // Bilingual Editorial Fields
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  projectType: Record<Locale, string>;
  role: Record<Locale, string>;
  stakeholder?: Record<Locale, string>;
  period: Record<Locale, string>;
  status: Record<Locale, string>;

  // Concise Case Study Narrative
  summary: Record<Locale, string>;
  problemStatement: Record<Locale, string>;
  systemSolution: Record<Locale, string>;
  personalContributions: Record<Locale, string[]>;
  verifiedEvidence: Record<Locale, string[]>;
  highlights?: Record<Locale, string[]>;
  keyModules?: ProjectFeatureModule[];
  metrics?: ProjectMetric[];

  // Technical Specs & Assets
  techStack: ProjectTechnicalSpec;
  coverImage: string;
  documentationImages: string[];

  // Optional Verified Links & Boundaries
  liveUrl?: string;
  githubUrl?: string;
  claimLimitation?: Record<Locale, string>;
}
