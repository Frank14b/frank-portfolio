import { ogCard } from "@/lib/og";
import { getAllPosts, getPost } from "@/lib/posts";
import { getProject } from "@/content/projects";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)!;
  return ogCard({ eyebrow: `Engineering blog · ${getProject(post.project)?.name ?? ""}`, title: post.title });
}
