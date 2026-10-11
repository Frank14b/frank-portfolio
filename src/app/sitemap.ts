import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl;
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/blog/`, priority: 0.9 },
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}/`, priority: 0.8 })),
    ...getAllPosts().map((p) => ({ url: `${base}/blog/${p.slug}/`, lastModified: p.date, priority: 0.7 })),
  ];
}
