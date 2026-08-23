import {
  projectsList,
  getAllProjects,
  getProjectBySlug,
  getAllProjectSlugs,
  getAdjacentProjects,
  getProjectsByCategory,
  getFeaturedProjects,
} from "./index";
import type { ProjectItem } from "./types";

export const projectsData: ProjectItem[] = projectsList;
export const getAllProjectsData = getAllProjects;
export const getProjectDataBySlug = getProjectBySlug;
export const getAllProjectSlugsData = getAllProjectSlugs;
export const getAdjacentProjectsData = getAdjacentProjects;
export const getProjectsByCategoryData = getProjectsByCategory;
export const getFeaturedProjectsData = getFeaturedProjects;

export * from "./index";
