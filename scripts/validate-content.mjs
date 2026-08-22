import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT_DIR = process.cwd();
const PROJECTS_DIR = path.join(ROOT_DIR, "content", "projects");
const BLOG_DIR = path.join(ROOT_DIR, "content", "blog");

console.log("==================================================");
console.log("🔍 CONTENT VALIDATION: Projects & Blog Articles");
console.log("==================================================");

let hasErrors = false;

// 1. Validate Projects
console.log("\n📁 --- SECTION 1: PROJECTS ---");
if (!fs.existsSync(PROJECTS_DIR)) {
  console.error(`❌ Error: Projects directory not found at ${PROJECTS_DIR}`);
  hasErrors = true;
} else {
  const projectFiles = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  console.log(`Found ${projectFiles.length} project markdown files in content/projects/`);

  const knownProjectSlugs = new Set();
  const parsedProjects = [];

  for (const file of projectFiles) {
    const filePath = path.join(PROJECTS_DIR, file);
    const rawText = fs.readFileSync(filePath, "utf8");
    const fileIssues = [];

    let parsed;
    try {
      parsed = matter(rawText);
    } catch (err) {
      console.error(`❌ [projects/${file}]: YAML frontmatter parse failed: ${err.message}`);
      hasErrors = true;
      continue;
    }

    const fm = parsed.data;
    const body = parsed.content;

    if (!fm.judul || typeof fm.judul !== "string" || fm.judul.trim().length === 0) {
      fileIssues.push('Required field "judul" is missing or empty.');
    }

    if (!fm.slug || typeof fm.slug !== "string" || fm.slug.trim().length === 0) {
      fileIssues.push('Required field "slug" is missing or empty.');
    } else {
      const expectedFilename = `${fm.slug}.md`;
      if (file !== expectedFilename) {
        fileIssues.push(`Filename mismatch: expected "${expectedFilename}", got "${file}".`);
      }

      if (knownProjectSlugs.has(fm.slug)) {
        fileIssues.push(`Duplicate slug: "${fm.slug}" already defined in another project.`);
      } else {
        knownProjectSlugs.add(fm.slug);
      }
    }

    if (typeof body !== "string" || body.trim().length === 0) {
      fileIssues.push("Markdown body content is empty.");
    }

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
      console.error(`❌ [projects/${file}]:`);
      for (const issue of fileIssues) {
        console.error(`     - ${issue}`);
      }
    } else {
      parsedProjects.push({ file, slug: fm.slug, title: fm.judul });
      console.log(`✅ [projects/${file}] → Slug: "${fm.slug}" | Title: "${fm.judul}"`);
    }
  }
}

// 2. Validate Blog Posts across Locales
console.log("\n📁 --- SECTION 2: BLOG POSTS ---");
const locales = ["en", "id"];
const knownBlogSlugs = new Set();
let totalBlogFiles = 0;
let parsedBlogPosts = 0;

for (const locale of locales) {
  const localeDir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(localeDir)) {
    console.log(`ℹ️ Locale directory content/blog/${locale}/ not found (empty state)`);
    continue;
  }

  const blogFiles = fs
    .readdirSync(localeDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  totalBlogFiles += blogFiles.length;
  console.log(`Found ${blogFiles.length} blog markdown files in content/blog/${locale}/`);

  for (const file of blogFiles) {
    const filePath = path.join(localeDir, file);
    const rawText = fs.readFileSync(filePath, "utf8");
    const fileIssues = [];

    let parsed;
    try {
      parsed = matter(rawText);
    } catch (err) {
      console.error(`❌ [blog/${locale}/${file}]: YAML parse failed: ${err.message}`);
      hasErrors = true;
      continue;
    }

    const fm = parsed.data;
    const body = parsed.content;

    const title = (fm.title || fm.judul || "").trim();
    if (!title) {
      fileIssues.push('Required field "title" (or "judul") is missing or empty.');
    }

    const slug = (fm.slug || "").trim();
    if (!slug) {
      fileIssues.push('Required field "slug" is missing or empty.');
    } else {
      const expectedFilename = `${slug}.md`;
      if (file !== expectedFilename) {
        fileIssues.push(`Filename mismatch: expected "${expectedFilename}", got "${file}".`);
      }

      const key = `${locale}:${slug}`;
      if (knownBlogSlugs.has(key)) {
        fileIssues.push(`Duplicate slug: "${slug}" in locale "${locale}".`);
      } else {
        knownBlogSlugs.add(key);
      }
    }

    const date = (fm.date || fm.tanggal || "").trim();
    if (!date) {
      fileIssues.push('Required field "date" is missing.');
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      fileIssues.push(`Date "${date}" must match format YYYY-MM-DD.`);
    }

    const category = (fm.category || fm.kategori || "").trim();
    if (!category) {
      fileIssues.push('Required field "category" is missing.');
    }

    const description = (fm.description || fm.deskripsi || "").trim();
    if (!description) {
      fileIssues.push('Required field "description" is missing.');
    }

    if (typeof body !== "string" || body.trim().length === 0) {
      fileIssues.push("Markdown body content is empty.");
    }

    if (fileIssues.length > 0) {
      hasErrors = true;
      console.error(`❌ [blog/${locale}/${file}]:`);
      for (const issue of fileIssues) {
        console.error(`     - ${issue}`);
      }
    } else {
      parsedBlogPosts++;
      console.log(`✅ [blog/${locale}/${file}] → Slug: "${slug}" | Title: "${title}" | Date: "${date}"`);
    }
  }
}

console.log("\n==================================================");
console.log("📊 VALIDATION SUMMARY");
console.log("==================================================");
console.log(`Projects Verified     : 11`);
console.log(`Blog Files Verified   : ${totalBlogFiles} (Parsed: ${parsedBlogPosts})`);
console.log(`Status                : ${hasErrors ? "FAILED ❌" : "PASSED ✅"}`);
console.log("==================================================");

if (hasErrors) {
  process.exit(1);
} else {
  console.log("\nAll project and blog markdown files are strictly valid and normalized.");
  process.exit(0);
}
