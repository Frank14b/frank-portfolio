import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/projects";
import { formatDate, type PostMeta } from "@/lib/posts";

export function SectionHeading({ eyebrow, title, intro, id }: { eyebrow: string; title: string; intro?: string; id?: string }) {
  return (
    <div id={id} className="mb-10 max-w-2xl scroll-mt-24">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
    </div>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-paper-2 px-2.5 py-0.5 font-mono text-[0.72rem] text-muted">
      {children}
    </span>
  );
}

export function ProjectCard({ project, posts }: { project: Project; posts: number }) {
  const cover = project.images?.[0];
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper-2/60 transition hover:-translate-y-0.5 hover:border-ink/25"
    >
      {cover ? (
        <div className="relative h-60 overflow-hidden border-b border-line bg-paper-2">
          {cover.shape === "phone" ? (
            <div className="flex h-full items-end justify-center gap-3 px-6 pt-6">
              {project.images!.slice(0, 3).map((img, i) => (
                <Image
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  width={160}
                  height={347}
                  className={`w-[30%] max-w-32 rounded-t-xl border border-line shadow-sm transition duration-500 group-hover:-translate-y-1 ${i === 1 ? "translate-y-0" : "translate-y-4"}`}
                />
              ))}
            </div>
          ) : (
            <Image src={cover.src} alt={cover.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top transition duration-500 group-hover:scale-[1.02]" />
          )}
        </div>
      ) : (
        <div className="flex h-60 items-end border-b border-line bg-[radial-gradient(circle_at_20%_20%,var(--accent-soft),transparent_60%)] p-6">
          <p className="font-display text-3xl leading-tight text-ink/80">{project.name}</p>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span className="font-mono uppercase tracking-wider text-accent">{project.kind}</span>
          <span>{project.period}</span>
        </div>
        <h3 className="mt-2 text-xl font-semibold">{project.name}</h3>
        <p className="mt-2 text-muted">{project.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 6).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-6 text-sm">
          <span className="text-muted">{posts > 0 ? `${posts} flow write-up${posts > 1 ? "s" : ""}` : project.role}</span>
          <span className="font-medium text-accent transition group-hover:translate-x-0.5">View project →</span>
        </div>
      </div>
    </Link>
  );
}

export function PostCard({ post, projectName }: { post: PostMeta; projectName?: string }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col rounded-2xl border border-line p-6 transition hover:border-ink/25 hover:bg-paper-2/60">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
        {projectName && <span className="font-mono uppercase tracking-wider text-accent">{projectName}</span>}
        <span>{formatDate(post.date)}</span>
        <span>{post.readingMinutes} min read</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-snug group-hover:text-accent">{post.title}</h3>
      <p className="mt-2 text-muted">{post.summary}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {post.tags.slice(0, 4).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </Link>
  );
}
