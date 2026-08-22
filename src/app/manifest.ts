import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Annas Tri Widagdo — Personal Portfolio",
    short_name: "Annas Portfolio",
    description:
      "Technical editorial portfolio of Annas Tri Widagdo, software engineer and AI practitioner.",
    start_url: "/en",
    display: "standalone",
    background_color: "#0c0e11",
    theme_color: "#f4f1ea",
    icons: [
      {
        src: "/assets/me/pas-foto.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  };
}
