import fs from "node:fs";
import path from "node:path";

function getLogoPathIfPresent(
  category: "tech" | "experience",
  slug: string,
  extensions: readonly string[],
): string | null {
  try {
    for (const extension of extensions) {
      const fileName = `logo.${extension}`;
      const filePath = path.join(
        process.cwd(),
        "public",
        "assets",
        category,
        slug,
        fileName,
      );

      if (fs.existsSync(filePath)) {
        return `/assets/${category}/${slug}/${fileName}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function getTechLogoPathIfPresent(slug: string): string | null {
  return getLogoPathIfPresent("tech", slug, ["svg", "webp", "png"]);
}

export function getExperienceLogoPathIfPresent(folderName: string): string | null {
  return getLogoPathIfPresent("experience", folderName, ["webp", "svg", "png"]);
}
