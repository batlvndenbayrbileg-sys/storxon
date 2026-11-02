import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/account", "/learn", "/admin", "/login", "/signup", "/forgot", "/api/"],
    },
    sitemap: "https://storxon.online/sitemap.xml",
  };
}
