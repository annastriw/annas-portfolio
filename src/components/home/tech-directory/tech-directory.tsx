import type { Locale } from "@/lib/i18n/config";
import type { TechCategoryData } from "./tech-category";
import { TechCategory } from "./tech-category";

interface TechDirectoryProps {
  locale: Locale;
}

export function TechDirectory({ locale }: TechDirectoryProps) {
  const isId = locale === "id";

  const categories: TechCategoryData[] = [
    {
      id: "frontend",
      code: "01 / FRONTEND",
      title: isId ? "Frontend Development" : "Frontend Development",
      items: [
        { slug: "nextjs", name: "Next.js", monogram: "NX", index: "01.01" },
        { slug: "react", name: "React.js", monogram: "RE", index: "01.02" },
        { slug: "laravel", name: "Laravel", monogram: "LV", index: "01.03" },
        { slug: "kotlin", name: "Kotlin", monogram: "KT", index: "01.04" },
        { slug: "flutter", name: "Flutter", monogram: "FL", index: "01.05" },
      ],
    },
    {
      id: "backend",
      code: "02 / BACKEND",
      title: isId ? "Backend & Services" : "Backend & Services",
      items: [
        { slug: "rest-api", name: "REST API", monogram: "API", index: "02.01" },
        { slug: "nestjs", name: "NestJS", monogram: "NS", index: "02.02" },
        { slug: "laravel", name: "Laravel", monogram: "LV", index: "02.03" },
        { slug: "flask", name: "Flask", monogram: "FK", index: "02.04" },
      ],
    },
    {
      id: "languages",
      code: "03 / PROGRAMMING",
      title: isId ? "Bahasa Pemrograman" : "Programming Languages",
      items: [
        { slug: "typescript", name: "TypeScript", monogram: "TS", index: "03.01" },
        { slug: "python", name: "Python", monogram: "PY", index: "03.02" },
        { slug: "kotlin", name: "Kotlin", monogram: "KT", index: "03.03" },
        { slug: "dart", name: "Dart", monogram: "DT", index: "03.04" },
        { slug: "csharp", name: "C#", monogram: "C#", index: "03.05" },
        { slug: "php", name: "PHP", monogram: "PHP", index: "03.06" },
      ],
    },
    {
      id: "tools",
      code: "04 / TOOLS & SYSTEMS",
      title: isId ? "Alat & Infrastruktur" : "Tools & Systems",
      items: [
        { slug: "figma", name: "Figma", monogram: "FG", index: "04.01" },
        { slug: "unity", name: "Unity", monogram: "UN", index: "04.02" },
        { slug: "lumion", name: "Lumion Pro", monogram: "LM", index: "04.03" },
        { slug: "mysql", name: "MySQL", monogram: "SQL", index: "04.04" },
        { slug: "linux-ubuntu", name: "Linux Ubuntu", monogram: "LX", index: "04.05" },
        { slug: "playwright", name: "Playwright", monogram: "PW", index: "04.06" },
        { slug: "docker", name: "Docker", monogram: "DK", index: "04.07" },
      ],
    },
  ];

  return (
    <div
      className="tech-directory-grid grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7"
      role="region"
      aria-label="Technical Capability Directory"
    >
      {categories.map((category, idx) => (
        <TechCategory key={category.id} category={category} index={idx} />
      ))}
    </div>
  );
}
