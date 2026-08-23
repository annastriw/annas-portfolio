import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Annas Tri Widagdo - Software Engineer",
    short_name: "Annas Tri Widagdo",
    description:
      "Technical editorial archive of Annas Tri Widagdo. Fullstack web applications, machine learning integration, and robust software architectures grounded in verified implementation evidence.",
    start_url: "/en",
    display: "standalone",
    background_color: "#0c0e11",
    theme_color: "#f4f1ea",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
