import fs from "node:fs";
import path from "node:path";

/**
 * Checks if a technology logo asset exists locally in public/assets/tech/<slug>/logo.svg
 */
export function getTechLogoPathIfPresent(slug: string): string | null {
  try {
    const filePathSvg = path.join(process.cwd(), "public", "assets", "tech", slug, "logo.svg");
    if (fs.existsSync(filePathSvg)) {
      return `/assets/tech/${slug}/logo.svg`;
    }
    const filePathWebp = path.join(process.cwd(), "public", "assets", "tech", slug, "logo.webp");
    if (fs.existsSync(filePathWebp)) {
      return `/assets/tech/${slug}/logo.webp`;
    }
    const filePathPng = path.join(process.cwd(), "public", "assets", "tech", slug, "logo.png");
    if (fs.existsSync(filePathPng)) {
      return `/assets/tech/${slug}/logo.png`;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Checks if an organization logo asset exists locally in public/assets/experience/<folder>/logo.webp
 */
export function getExperienceLogoPathIfPresent(folderName: string): string | null {
  try {
    const filePathWebp = path.join(process.cwd(), "public", "assets", "experience", folderName, "logo.webp");
    if (fs.existsSync(filePathWebp)) {
      return `/assets/experience/${folderName}/logo.webp`;
    }
    const filePathSvg = path.join(process.cwd(), "public", "assets", "experience", folderName, "logo.svg");
    if (fs.existsSync(filePathSvg)) {
      return `/assets/experience/${folderName}/logo.svg`;
    }
    const filePathPng = path.join(process.cwd(), "public", "assets", "experience", folderName, "logo.png");
    if (fs.existsSync(filePathPng)) {
      return `/assets/experience/${folderName}/logo.png`;
    }
    return null;
  } catch {
    return null;
  }
}
