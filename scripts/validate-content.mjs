import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT_DIR = process.cwd();
const PROJECTS_DIR = path.join(ROOT_DIR, "content", "projects");

console.log("==================================================");
console.log("CONTENT VALIDATION: Project Source Records");
console.log("==================================================");

let hasErrors = false;
let verifiedProjects = 0;

if (!fs.existsSync(PROJECTS_DIR)) {
  console.error(`Error: Projects directory not found at ${PROJECTS_DIR}`);
  hasErrors = true;
} else {
  const projectFiles = fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort();
  const knownProjectSlugs = new Set();

  console.log(
    `Found ${projectFiles.length} project Markdown files in content/projects/`,
  );

  for (const file of projectFiles) {
    const filePath = path.join(PROJECTS_DIR, file);
    const rawText = fs.readFileSync(filePath, "utf8");
    const fileIssues = [];

    let parsed;
    try {
      parsed = matter(rawText);
    } catch (error) {
      console.error(
        `[projects/${file}]: YAML frontmatter parse failed: ${error.message}`,
      );
      hasErrors = true;
      continue;
    }

    const frontmatter = parsed.data;
    const body = parsed.content;

    if (
      !frontmatter.judul ||
      typeof frontmatter.judul !== "string" ||
      frontmatter.judul.trim().length === 0
    ) {
      fileIssues.push('Required field "judul" is missing or empty.');
    }

    if (
      !frontmatter.slug ||
      typeof frontmatter.slug !== "string" ||
      frontmatter.slug.trim().length === 0
    ) {
      fileIssues.push('Required field "slug" is missing or empty.');
    } else {
      const expectedFilename = `${frontmatter.slug}.md`;
      if (file !== expectedFilename) {
        fileIssues.push(
          `Filename mismatch: expected "${expectedFilename}", got "${file}".`,
        );
      }

      if (knownProjectSlugs.has(frontmatter.slug)) {
        fileIssues.push(
          `Duplicate slug: "${frontmatter.slug}" already exists.`,
        );
      } else {
        knownProjectSlugs.add(frontmatter.slug);
      }
    }

    if (typeof body !== "string" || body.trim().length === 0) {
      fileIssues.push("Markdown body content is empty.");
    }

    if (
      frontmatter.asset_path !== undefined &&
      frontmatter.asset_path !== null
    ) {
      if (typeof frontmatter.asset_path !== "string") {
        fileIssues.push('"asset_path" must be a string.');
      } else if (frontmatter.asset_path.trim().length > 0) {
        const cleanPath = frontmatter.asset_path.trim();
        if (cleanPath.includes("..") || path.isAbsolute(cleanPath)) {
          fileIssues.push(
            `Path traversal or absolute path in "asset_path": "${cleanPath}".`,
          );
        } else {
          const resolvedAssetDir = path.resolve(ROOT_DIR, "public", cleanPath);
          if (!fs.existsSync(resolvedAssetDir)) {
            fileIssues.push(
              `Referenced asset directory does not exist: "${resolvedAssetDir}".`,
            );
          }
        }
      }
    }

    if (fileIssues.length > 0) {
      hasErrors = true;
      console.error(`[projects/${file}]:`);
      for (const issue of fileIssues) {
        console.error(`  - ${issue}`);
      }
    } else {
      verifiedProjects += 1;
      console.log(
        `[projects/${file}] Slug: "${frontmatter.slug}" | Title: "${frontmatter.judul}"`,
      );
    }
  }
}

console.log("==================================================");
console.log(`Projects Verified     : ${verifiedProjects}`);
console.log("Blog Delivery         : Static typed TypeScript (tests and tsc)");
console.log(`Status                : ${hasErrors ? "FAILED" : "PASSED"}`);
console.log("==================================================");

if (hasErrors) {
  process.exit(1);
}

console.log("All project source Markdown files are valid.");
