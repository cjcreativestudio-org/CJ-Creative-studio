import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const BASE_URL = "https://www.cjcreativestudio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "monthly" as const },
    { url: "/work", priority: 0.9, changeFrequency: "monthly" as const },
    ...projects.map((p) => ({
      url: `/work/${p.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    { url: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/sprint", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
    { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/terms",   priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
