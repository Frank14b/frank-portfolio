import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-baseline gap-2 font-display text-2xl leading-none">
          Frank Fontcha<span className="text-accent">.</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="hidden rounded-full px-3 py-1.5 text-sm text-muted transition hover:text-ink sm:inline-block"
            >
              {n.label}
            </Link>
          ))}
          <Link href="/blog" className="rounded-full px-3 py-1.5 text-sm text-muted hover:text-ink sm:hidden">
            Blog
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
