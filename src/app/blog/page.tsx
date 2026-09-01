import Link from "next/link";
import { getPosts } from "@/lib/posts";

export const metadata = { title: "Blog" };

/**
 * Blog index — lists every post from content/posts/. Ships with neutral
 * styling on purpose: restyle to the site's design tokens during the build.
 */
export default function BlogIndex() {
  const posts = getPosts();
  return (
    <main className="mx-auto min-h-screen max-w-3xl bg-ink px-6 py-24 text-silver md:py-32">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Journal</p>
      <h1 className="mt-4 font-display font-display-expanded text-4xl font-light text-white sm:text-5xl">
        Field notes
      </h1>
      {posts.length === 0 ? (
        <p className="mt-8 text-white/70">New stories are on the way — check back soon.</p>
      ) : (
        <ul className="mt-12 space-y-10 divide-y divide-white/10">
          {posts.map((p) => (
            <li key={p.slug} className="pt-10 first:pt-0">
              <Link href={`/blog/${p.slug}`} className="group block">
                {p.date && (
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{p.date}</p>
                )}
                <h2 className="mt-2 text-2xl font-medium text-white group-hover:text-accent">
                  {p.title}
                </h2>
                {p.description && <p className="mt-2 text-white/70">{p.description}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.18em]">
        <Link href="/" className="text-muted hover:text-white">← Home</Link>
      </p>
    </main>
  );
}
