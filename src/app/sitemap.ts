import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const routes = [
  { path: "", priority: 1 },
  { path: "/work", priority: 0.9 },
  { path: "/work/hireplume", priority: 0.9 },
  { path: "/work/booknook", priority: 0.7 },
  { path: "/work/portfolio", priority: 0.6 },
  { path: "/about", priority: 0.8 },
  { path: "/lab", priority: 0.7 },
  { path: "/experience", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
  { path: "/cv", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const lastModified = new Date("2026-10-19T00:00:00.000Z");
  return routes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
