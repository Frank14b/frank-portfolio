import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { getProject, projects } from "@/content/projects";
import { PostCard, SectionHeading } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { absUrl, breadcrumbLd, ogImage, personLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Engineering blog",
  description:
    "Real flows from production apps explained step by step: event-driven backends, idempotency, auth, WebRTC calls, VoIP push, HLS video, RAG and offline-first mobile, with code and lessons you can reuse.",
  alternates: { canonical: "/blog/" },
  openGraph: { type: "website", url: "/blog/", title: "Engineering blog | Frank Fontcha", images: [ogImage("/og.png", "Frank Fontcha engineering blog")] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const groups = projects
    .map((p) => ({ project: p, posts: posts.filter((post) => post.project === p.slug) }))
    .filter((g) => g.posts.length > 0);

  return (
    <div className="container-x pt-16">
      <JsonLd
        graph={[
          personLd,
          {
            "@type": "Blog",
            "@id": absUrl("/blog/#blog"),
            url: absUrl("/blog/"),
            name: "Frank Fontcha: Engineering blog",
            author: { "@id": absUrl("/#person") },
            blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: absUrl(`/blog/${p.slug}/`), datePublished: p.date })),
          },
          breadcrumbLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }]),
        ]}
      />
      <SectionHeading
        eyebrow="Engineering blog"
        title="Flows from real apps, explained"
        intro="Each post takes one flow I built (payments, events, auth, real-time calls, RAG, offline storage) and walks through the sequence, the core code, the design decisions and the mistakes. Steal the patterns."
      />
      <nav className="mb-12 flex flex-wrap gap-2">
        {groups.map((g) => (
          <a key={g.project.slug} href={`#${g.project.slug}`} className="rounded-full border border-line px-3 py-1 text-sm text-muted hover:border-ink/30 hover:text-ink">
            {g.project.name} <span className="text-accent">{g.posts.length}</span>
          </a>
        ))}
      </nav>
      <div className="space-y-16">
        {groups.map((g) => (
          <section key={g.project.slug} id={g.project.slug} className="scroll-mt-24">
            <h2 className="mb-5 border-b border-line pb-3 font-display text-3xl">{g.project.name}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {g.posts.map((post) => (
                <PostCard key={post.slug} post={post} projectName={getProject(post.project)?.name} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
