import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Plain Prophecy",
    short_name: "Prophecy",
    description: "Biblical prophecy studies and resources",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a", // Match your dark mode theme
    theme_color: "#0f172a",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}