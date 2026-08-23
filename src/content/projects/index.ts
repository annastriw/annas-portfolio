import type { ProjectItem, ProjectCategory } from "./types";
import { ukgSystemProject } from "./ukg-system";
import { ihealthEduProject } from "./ihealth-edu";
import { dialisisConnectEduProject } from "./dialisis-connect-edu";
import { nusaDakwahProject } from "./nusa-dakwah";
import { simastokProject } from "./simastok";
import { mlHeartAttackProject } from "./ml-heart-attack";
import { speechToTextProject } from "./speech-to-text";
import { thermalPrinterServiceProject } from "./thermal-printer-service";
import { footyStandingsProject } from "./footy-standings";
import { panoramicVirtualTourProject } from "./panoramic-virtual-tour";

export * from "./types";
export * from "./ukg-system";
export * from "./ihealth-edu";
export * from "./dialisis-connect-edu";
export * from "./nusa-dakwah";
export * from "./simastok";
export * from "./ml-heart-attack";
export * from "./speech-to-text";
export * from "./thermal-printer-service";
export * from "./footy-standings";
export * from "./panoramic-virtual-tour";

/**
 * Curated list of all 10 public projects in exact deterministic order.
 */
export const projectsList: ProjectItem[] = [
  ukgSystemProject,
  ihealthEduProject,
  dialisisConnectEduProject,
  nusaDakwahProject,
  simastokProject,
  mlHeartAttackProject,
  speechToTextProject,
  thermalPrinterServiceProject,
  footyStandingsProject,
  panoramicVirtualTourProject,
];

/**
 * Fetches all curated projects.
 */
export function getAllProjects(): ProjectItem[] {
  return [...projectsList].sort((a, b) => a.order - b.order);
}

/**
 * Fetches a single project by slug.
 */
export function getProjectBySlug(slug: string): ProjectItem | null {
  return projectsList.find((p) => p.slug === slug) || null;
}

/**
 * Fetches all project slugs.
 */
export function getAllProjectSlugs(): string[] {
  return projectsList.map((p) => p.slug);
}

/**
 * Fetches adjacent projects (prev and next).
 */
export function getAdjacentProjects(slug: string): {
  prev: ProjectItem | null;
  next: ProjectItem | null;
} {
  const index = projectsList.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: index > 0 ? projectsList[index - 1] : null,
    next: index < projectsList.length - 1 ? projectsList[index + 1] : null,
  };
}

/**
 * Fetches projects filtered by category.
 */
export function getProjectsByCategory(category: ProjectCategory): ProjectItem[] {
  return projectsList.filter((p) => p.category === category);
}

/**
 * Fetches featured projects for homepage preview.
 */
export function getFeaturedProjects(): ProjectItem[] {
  return projectsList.filter((p) => p.featured);
}
