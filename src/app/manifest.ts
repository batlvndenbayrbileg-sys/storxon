import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Storxon — Өөрийн онлайн дэлгүүрийг 0-ээс бүтээ",
    short_name: "Storxon",
    description: "AI-тай хамт онлайн дэлгүүрээ бүтээж сурах сургалт.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#6d48f0",
    lang: "mn",
    icons: [{ src: "/kit/head.webp", sizes: "512x512", type: "image/webp", purpose: "any" }],
  };
}
