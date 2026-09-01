import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:flex-row md:items-center">
        <p>GravityCart &copy; {new Date().getFullYear()}. Engineered like a car.</p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/blog" className="hover:text-silver">Journal</Link>
          <Link href="/legal/privacy" className="hover:text-silver">Privacy</Link>
          <Link href="/legal/cookies" className="hover:text-silver">Cookies</Link>
        </nav>
      </div>
    </footer>
  );
}
