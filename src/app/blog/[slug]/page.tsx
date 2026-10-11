import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getAllPosts, getPost, getPostsForProject } from "@/lib/posts";
import { getProject } from "@/content/projects";
import { profile } from "@/content/profile";
import { Mdx } from "@/components/mdx";
import { PostCard, Tag } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { absUrl, breadcrumbLd, ogImage, personLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const url = `/blog/${post.slug}/`;
  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.summary,
      siteName: profile.shortName,
      publishedTime: post.date,
      authors: [profile.siteUrl],
      section: getProject(post.project)?.name,
      tags: post.tags,
      images: [ogImage(`${url}og.png`, post.title)],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.summary, images: [`${url}og.png`] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const project = getProject(post.project);
  const related = getPostsForProject(post.project).filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="container-x pt-14">
      <JsonLd
        graph={[
          personLd,
          {
            "@type": "BlogPosting",
            "@id": absUrl(`/blog/${post.slug}/#article`),
            headline: post.title,
            description: post.summary,
            datePublished: post.date,
            dateModified: post.date,
            url: absUrl(`/blog/${post.slug}/`),
            mainEntityOfPage: absUrl(`/blog/${post.slug}/`),
            image: absUrl(`/blog/${post.slug}/og.png`),
            keywords: post.tags.join(", "),
            timeRequired: `PT${post.readingMinutes}M`,
            inLanguage: "en",
            author: { "@id": absUrl("/#person") },
            publisher: { "@id": absUrl("/#person") },
            isPartOf: { "@type": "Blog", "@id": absUrl("/blog/#blog") },
            ...(project && { about: { "@type": "SoftwareApplication", name: project.name, url: project.url } }),
          },
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog/" },
            { name: post.title, path: `/blog/${post.slug}/` },
          ]),
        ]}
      />
      <div className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm text-muted hover:text-ink">← All posts</Link>
        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          {project && (
            <Link href={`/projects/${project.slug}`} className="font-mono text-xs uppercase tracking-wider text-accent">
              {project.name}
            </Link>
          )}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingMinutes} min read</span>
        </div>
        <h1 className="mt-4 font-display text-4xl leading-[1.08] sm:text-6xl">{post.title}</h1>
        <p className="mt-5 text-xl text-muted">{post.summary}</p>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <hr className="my-10 border-line" />
        <div className="prose-post">
          <Mdx source={post.body} />
        </div>
        <div className="mt-16 rounded-2xl border border-line bg-paper-2/60 p-6">
          <p className="font-semibold">Written by {profile.name}</p>
          <p className="mt-1 text-muted">
            {profile.title}, {profile.location}. Questions, or want this pattern in your stack?{" "}
            <a className="text-accent underline underline-offset-2" href={`mailto:${profile.email}`}>Email me</a>.
          </p>
        </div>
      </div>
      {related.length > 0 && (
        <div className="mx-auto mt-16 max-w-5xl">
          <h2 className="mb-5 font-display text-3xl">More from {project?.name}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} projectName={project?.name} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
