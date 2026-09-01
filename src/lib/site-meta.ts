import fs from "fs";
import path from "path";

export interface FaqEntry {
  q: string;
  a: string;
}

export interface ProductMeta {
  sku: string;
  name: string;
  price: string;
  currency: string;
  description: string;
}

export interface SiteMeta {
  organization: {
    name: string;
    description: string;
  };
  products: ProductMeta[];
  faq: FaqEntry[];
}

const SITE_META_PATH = path.join(process.cwd(), "content", "site-meta.json");

export function getSiteMeta(): SiteMeta {
  const raw = fs.readFileSync(SITE_META_PATH, "utf-8");
  return JSON.parse(raw) as SiteMeta;
}
