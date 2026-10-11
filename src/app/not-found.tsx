import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-5xl">This page doesn’t exist.</h1>
      <Link href="/" className="mt-8 inline-block text-accent">← Back home</Link>
    </div>
  );
}
