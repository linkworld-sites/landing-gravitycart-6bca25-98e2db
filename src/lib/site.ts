export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://e65f587b.run.linkworld.ai";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
