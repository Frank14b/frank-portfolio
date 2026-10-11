import { ogCard } from "@/lib/og";
import { getProject, projects } from "@/content/projects";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug)!;
  return ogCard({ eyebrow: `${p.kind} · ${p.period}`, title: p.name, subtitle: p.tagline });
}
