import type { Locale } from "@/lib/i18n/config";

export type ProjectCategory = "web-app" | "ml" | "mobile" | "other";

export interface ProjectTechnicalSpec {
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
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  projectType: Record<Locale, string>;
  role: Record<Locale, string>;
  stakeholder?: Record<Locale, string>;
  period: Record<Locale, string>;
  status: Record<Locale, string>;
  liveUrl?: string;
  githubUrl?: string;
  coverImage: string;
  documentationImages: string[];
  techStack: {
    core: string[];
    architecture: string[];
    qaOrDeployment: string[];
  };
  metrics: ProjectTechnicalSpec[];
  summary: Record<Locale, string>;
  problemStatement: Record<Locale, string>;
  systemSolution: Record<Locale, string>;
  personalContributions: Record<Locale, string[]>;
  keyModules: ProjectFeatureModule[];
  verifiedEvidence: Record<Locale, string[]>;
  claimLimitation?: Record<Locale, string>;
}

export interface ProjectCategoryConfig {
  id: ProjectCategory;
  name: Record<Locale, string>;
  tag: string;
  description: Record<Locale, string>;
}
