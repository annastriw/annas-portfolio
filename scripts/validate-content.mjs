import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT_DIR = process.cwd();
const PROJECTS_DIR = path.join(ROOT_DIR, "content", "projects");

console.log("==================================================");
console.log("🔍 CONTENT VALIDATION: Annas Portfolio Projects");
console.log("==================================================");

if (!fs.existsSync(PROJECTS_DIR)) {
  console.error(`❌ Error: Projects directory not found at ${PROJECTS_DIR}`);
  process.exit(1);
}

const files = fs
  .readdirSync(PROJECTS_DIR)
  .filter((f) => f.endsWith(".md"))
  .sort();

console.log(`📁 Found ${files.length} project markdown files in content/projects/\n`);

let hasErrors = false;
const knownSlugs = new Set();
const parsedProjects = [];

for (const file of files) {
  const filePath = path.join(PROJECTS_DIR, file);
  const rawText = fs.readFileSync(filePath, "utf8");
  const fileIssues = [];

  let parsed;
  try {
    parsed = matter(rawText);
  } catch (err) {
    console.error(`❌ [${file}]: YAML frontmatter parse failed: ${err.message}`);
    hasErrors = true;
    continue;
  }

  const fm = parsed.data;
  const body = parsed.content;

  // 1. Required judul/title
  if (!fm.judul || typeof fm.judul !== "string" || fm.judul.trim().length === 0) {
    fileIssues.push('Required field "judul" is missing or empty.');
  }

  // 2. Required slug
  if (!fm.slug || typeof fm.slug !== "string" || fm.slug.trim().length === 0) {
    fileIssues.push('Required field "slug" is missing or empty.');
  } else {
    // 3. Filename matches slug
    const expectedFilename = `${fm.slug}.md`;
    if (file !== expectedFilename) {
      fileIssues.push(`Filename mismatch: expected "${expectedFilename}", got "${file}".`);
    }

    // 4. Duplicate slug check
    if (knownSlugs.has(fm.slug)) {
      fileIssues.push(`Duplicate slug: "${fm.slug}" already defined in another file.`);
    } else {
      knownSlugs.add(fm.slug);
    }
  }

  // 5. Body non-empty
  if (typeof body !== "string" || body.trim().length === 0) {
    fileIssues.push("Markdown body content is empty.");
  }

  // 6. Asset path check
  let resolvedAssetDir = null;
  if (fm.asset_path !== undefined && fm.asset_path !== null) {
    if (typeof fm.asset_path !== "string") {
      fileIssues.push('"asset_path" must be a string.');
    } else if (fm.asset_path.trim().length > 0) {
      const cleanPath = fm.asset_path.trim();
      if (cleanPath.includes("..") || path.isAbsolute(cleanPath)) {
        fileIssues.push(`Path traversal or absolute path in "asset_path": "${cleanPath}".`);
      } else {
        resolvedAssetDir = path.resolve(ROOT_DIR, "public", cleanPath);
        if (!fs.existsSync(resolvedAssetDir)) {
          fileIssues.push(`Referenced asset directory does not exist: "${resolvedAssetDir}".`);
        }
      }
    }
  }

  if (fileIssues.length > 0) {
    hasErrors = true;
    console.error(`❌ [${file}]:`);
    for (const issue of fileIssues) {
      console.error(`     - ${issue}`);
    }
  } else {
    const kind = fm.jenis === "Internship" || fm.jenis_project?.toLowerCase().includes("internship") ? "Internship" : "Project";
    const projectType = fm.jenis_project || fm.fokus || "Software Engineering";
    const role = fm.peran || fm.role || "Developer";
    const stakeholder = fm.stakeholder || fm.client || fm.organisasi || "-";
    const status = fm.status || "-";

    parsedProjects.push({
      file,
      slug: fm.slug,
      title: fm.judul,
      kind,
      projectType,
      role,
      stakeholder,
      status,
      assetPath: fm.asset_path || "(none)",
    });
    console.log(`✅ [${file}] → Slug: "${fm.slug}" | Title: "${fm.judul}" | Role: "${role}"`);
  }
}

console.log("\n==================================================");
console.log("📊 VALIDATION SUMMARY");
console.log("==================================================");
console.log(`Total Project Files   : ${files.length}`);
console.log(`Successfully Parsed   : ${parsedProjects.length}`);
console.log(`Unique Slugs Verified : ${knownSlugs.size}`);
console.log(`Status                : ${hasErrors ? "FAILED ❌" : "PASSED ✅"}`);
console.log("==================================================");

if (hasErrors) {
  process.exit(1);
} else {
  console.log("\nAll project markdown files are strictly valid and normalized.");
  process.exit(0);
}
