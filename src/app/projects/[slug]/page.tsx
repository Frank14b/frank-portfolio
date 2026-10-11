import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { getPostsForProject } from "@/lib/posts";
import { PostCard, Tag } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { absUrl, breadcrumbLd, ogImage, personLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  const url = `/projects/${p.slug}/`;
  return {
    title: `${p.name}: ${p.kind === "Product" ? "case study" : "project"}`,
    description: `${p.tagline} ${p.role}. Stack: ${p.stack.slice(0, 6).join(", ")}.`,
    keywords: [p.name, ...p.stack],
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: p.name, description: p.tagline, images: [ogImage(`${url}og.png`, p.name)] },
    twitter: { card: "summary_large_image", title: p.name, description: p.tagline, images: [`${url}og.png`] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const posts = getPostsForProject(project.slug);
  const phones = project.images?.filter((i) => i.shape === "phone") ?? [];
  const wides = project.images?.filter((i) => i.shape !== "phone") ?? [];

  return (
    <div className="container-x pt-14">
      <JsonLd
        graph={[
          personLd,
          {
            "@type": project.kind === "Product" || project.kind === "Proof of concept" ? "SoftwareApplication" : "CreativeWork",
            "@id": absUrl(`/projects/${project.slug}/#work`),
            name: project.name,
            description: project.description,
            url: project.url ?? absUrl(`/projects/${project.slug}/`),
            creator: { "@id": absUrl("/#person") },
            keywords: project.stack.join(", "),
            ...(project.kind === "Product" && { applicationCategory: "BusinessApplication", operatingSystem: "Android, iOS, Web" }),
            ...(project.images?.[0] && { image: absUrl(project.images[0].src) }),
          },
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/#work" },
            { name: project.name, path: `/projects/${project.slug}/` },
          ]),
        ]}
      />
      <Link href="/#work" className="text-sm text-muted hover:text-ink">← All work</Link>
      <div className="mt-8 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="eyebrow">
            {project.kind} · {project.period}
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl">{project.name}</h1>
          <p className="mt-5 text-xl text-muted">{project.tagline}</p>
          <p className="mt-8 text-lg leading-relaxed">{project.description}</p>
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer" className="mt-8 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:opacity-90">
              Visit {project.url.replace(/^https?:\/\//, "")} ↗
            </a>
          )}
        </div>
        <aside className="space-y-8 lg:pt-10">
          <div>
            <p className="eyebrow">Role</p>
            <p className="mt-2 font-semibold">{project.role}</p>
          </div>
          <div>
            <p className="eyebrow">Highlights</p>
            <ul className="mt-3 space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Stack</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {phones.length > 0 && (
        <div className="mt-16 flex justify-center gap-4 overflow-hidden rounded-3xl border border-line bg-paper-2 px-4 pt-10 sm:gap-8">
          {phones.map((img) => (
            <Image key={img.src} src={img.src} alt={img.alt} width={260} height={564} className="w-1/3 max-w-60 rounded-t-2xl border border-line shadow-lg" />
          ))}
        </div>
      )}
      {wides.length > 0 && (
        <div className="mt-16 grid gap-6">
          {wides.map((img) => (
            <Image key={img.src} src={img.src} alt={img.alt} width={1440} height={900} className="w-full rounded-2xl border border-line" />
          ))}
        </div>
      )}

      {project.architecture && (
        <section className="mt-20 max-w-3xl">
          <h2 className="font-display text-4xl">Architecture</h2>
          <ul className="mt-6 space-y-4">
            {project.architecture.map((a) => (
              <li key={a} className="flex gap-3 text-lg leading-relaxed">
                <span className="mt-3.5 h-px w-4 shrink-0 bg-accent" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {posts.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-4xl">Flows I’ve written up</h2>
          <p className="mt-3 max-w-2xl text-muted">How specific parts of {project.name} work under the hood, with code you can reuse.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
