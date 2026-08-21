import path from "node:path";
import fs from "node:fs";
import type { ContentValidationIssue, RawProjectFrontmatter } from "./project-types";

/**
 * Validates a single project's raw frontmatter and body content.
 */
export function validateProjectRecord(
  filename: string,
  raw: unknown,
  body: string,
  baseAssetsDir: string,
  knownSlugs: Set<string>,
): ContentValidationIssue[] {
  const issues: ContentValidationIssue[] = [];

  if (!raw || typeof raw !== "object") {
    issues.push({
      filename,
      message: "Frontmatter parsing failed or frontmatter is not an object.",
    });
    return issues;
  }

  const fm = raw as RawProjectFrontmatter;

  // 1. Validate required title/judul
  const title = fm.judul;
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    issues.push({
      filename,
      field: "judul",
      message: 'Required field "judul" is missing, not a string, or empty.',
    });
  }

  // 2. Validate required slug
  const slug = fm.slug;
  if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
    issues.push({
      filename,
      field: "slug",
      message: 'Required field "slug" is missing, not a string, or empty.',
    });
  } else {
    // 3. Validate filename matches slug
    const expectedFilename = `${slug}.md`;
    if (filename !== expectedFilename) {
      issues.push({
        filename,
        field: "slug",
        message: `Filename mismatch: expected "${expectedFilename}", but found "${filename}".`,
      });
    }

    // 4. Validate duplicate slug
    if (knownSlugs.has(slug)) {
      issues.push({
        filename,
        field: "slug",
        message: `Duplicate slug detected: "${slug}" is already defined in another project.`,
      });
    } else {
      knownSlugs.add(slug);
    }
  }

  // 5. Validate non-empty body content
  if (typeof body !== "string" || body.trim().length === 0) {
    issues.push({
      filename,
      field: "body",
      message: "Markdown body content is missing or empty.",
    });
  }

  // 6. Validate asset_path safety & directory existence if defined
  if (fm.asset_path !== undefined && fm.asset_path !== null) {
    if (typeof fm.asset_path !== "string") {
      issues.push({
        filename,
        field: "asset_path",
        message: '"asset_path" must be a string if defined.',
      });
    } else if (fm.asset_path.trim().length > 0) {
      const cleanPath = fm.asset_path.trim();

      // Guard against directory traversal
      if (cleanPath.includes("..") || path.isAbsolute(cleanPath)) {
        issues.push({
          filename,
          field: "asset_path",
          message: `Path traversal or absolute path not permitted in "asset_path": "${cleanPath}".`,
        });
      } else {
        // Check directory existence in public/assets/projects/
        const targetDir = path.resolve(process.cwd(), "public", cleanPath);
        const projectsRoot = path.resolve(process.cwd(), "public", "assets", "projects");

        // Guard against escaping the projects asset directory
        if (!targetDir.startsWith(projectsRoot) && !targetDir.startsWith(path.resolve(process.cwd(), "public", "assets"))) {
          issues.push({
            filename,
            field: "asset_path",
            message: `"asset_path" resolves outside public assets root: "${cleanPath}".`,
          });
        } else if (!fs.existsSync(targetDir)) {
          issues.push({
            filename,
            field: "asset_path",
            message: `Asset directory referenced in "asset_path" does not exist: "${cleanPath}" (resolved: "${targetDir}").`,
          });
        }
      }
    }
  }

  return issues;
}
