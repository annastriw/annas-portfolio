"use client";

import type {
  ProjectCaseStudy,
  ProjectCaseStudyLocale,
} from "@/content/projects/project-case-studies";
import {
  ProjectDetailView,
  isSharedProjectDetail,
} from "./project-detail-view";

interface ProjectCaseStudyViewProps {
  project: ProjectCaseStudy;
  locale: ProjectCaseStudyLocale;
  previous?: ProjectCaseStudy | null;
  next?: ProjectCaseStudy | null;
}

/**
 * Unified Project Detail View Router.
 * All active project detail routes render through the shared ProjectDetailView template.
 */
export function ProjectCaseStudyView({
  project,
  locale,
}: ProjectCaseStudyViewProps) {
  return <ProjectDetailView project={project} locale={locale} />;
}

export { isSharedProjectDetail };
