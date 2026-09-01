import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPosts } from "@/lib/posts";
import { getLegalSlugs } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/product", "/checkout", "/blog"];
  const blogPaths = getPosts().map((p) => `/blog/${p.slug}`);
  const legalPaths = getLegalSlugs().map((slug) => `/legal/${slug}`);

  return [...staticPaths, ...blogPaths, ...legalPaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
