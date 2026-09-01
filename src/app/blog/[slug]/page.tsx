import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return (
    <main className="mx-auto min-h-screen max-w-3xl bg-ink px-6 py-24 text-silver md:py-32">
      <Link href="/blog" className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted hover:text-white">
        ← All posts
      </Link>
      <h1 className="mt-8 font-display font-display-expanded text-4xl font-light text-white sm:text-5xl">
        {post.title}
      </h1>
      {post.date && (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{post.date}</p>
      )}
      <article
        className="post-body mt-10 text-white/80"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </main>
  );
}
