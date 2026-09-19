import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Con Fe",
    short_name: "Con Fe",
    description: "Acompañamiento espiritual cristiano y católico. No necesitas saber qué decir. Empieza aquí.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F4EE",
    theme_color: "#1F3443",
    icons: [
      {
        src: "/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        src: "/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
  };
}
