import Image from "next/image";
import Link from "next/link";
import { certifications, education, experience, languages, profile, skills, stats } from "@/content/profile";
import { projects, getProject } from "@/content/projects";
import { getAllPosts, getPostsForProject } from "@/lib/posts";
import { PostCard, ProjectCard, SectionHeading, Tag } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { absUrl, personLd, websiteLd } from "@/lib/seo";

export default function Home() {
  const posts = getAllPosts();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      <JsonLd
        graph={[
          personLd,
          websiteLd,
          { "@type": "ProfilePage", "@id": absUrl("/#profile"), url: absUrl("/"), mainEntity: { "@id": absUrl("/#person") }, isPartOf: { "@id": absUrl("/#website") } },
        ]}
      />
      {/* Hero */}
      <section className="container-x grid items-center gap-12 overflow-x-clip pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="eyebrow">{profile.location} · {profile.availability}</p>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] sm:text-7xl">
            I build platforms that hold up <em className="text-accent">under load</em>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            I’m <strong className="font-semibold text-ink">{profile.name}</strong>, {profile.title.toLowerCase()}. {profile.summary.split(". ").slice(1).join(". ")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:opacity-90">
              Get in touch
            </a>
            <a href={profile.cv} className="rounded-full border border-line px-5 py-2.5 text-sm font-medium transition hover:border-ink/40">
              Download CV
            </a>
            <Link href="/blog" className="rounded-full px-5 py-2.5 text-sm font-medium text-accent transition hover:bg-accent-soft">
              Read the engineering blog →
            </Link>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 -z-10 rotate-3 rounded-[2rem] bg-accent-soft" />
          <Image
            src="/frank-portrait.jpg"
            alt={`Portrait of ${profile.name}`}
            width={640}
            height={800}
            priority
            className="aspect-[4/5] w-full rounded-[1.75rem] border border-line object-cover"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-line bg-paper-2/50">
        <dl className="container-x grid grid-cols-2 gap-y-8 py-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="pr-4">
              <dt className="font-display text-5xl text-ink">{s.value}</dt>
              <dd className="mt-1 text-sm text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Work */}
      <section className="container-x pt-24">
        <SectionHeading
          id="work"
          eyebrow="Selected work"
          title="Products I've architected and shipped"
          intro="Two products I founded, the platforms I lead at work, and a few builds that show how I approach reliability."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} posts={getPostsForProject(p.slug).length} />
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {others.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="group rounded-2xl border border-line p-6 transition hover:border-ink/25 hover:bg-paper-2/60">
              <p className="font-mono text-xs uppercase tracking-wider text-accent">{p.kind}</p>
              <h3 className="mt-2 text-lg font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm text-muted">{p.tagline}</p>
              <p className="mt-4 text-sm font-medium text-accent">View →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section className="container-x pt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Engineering blog"
            title="How the flows actually work"
            intro="Write-ups of real flows from my apps: the sequence, the code, the trade-offs and what broke. Written so you can reuse the patterns."
          />
          <Link href="/blog" className="mb-10 text-sm font-medium text-accent">All {posts.length} posts →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map((post) => (
            <PostCard key={post.slug} post={post} projectName={getProject(post.project)?.name} />
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="container-x pt-24">
        <SectionHeading eyebrow="Toolbox" title="Skills & technologies" intro="What I use in production, grouped by the problems it solves." />
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((g) => (
            <div key={g.group} className="border-t border-line pt-5">
              <h3 className="font-semibold">{g.group}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((i) => (
                  <Tag key={i}>{i}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="container-x pt-24">
        <SectionHeading id="experience" eyebrow="Experience" title="Where I've done the work" />
        <ol className="relative border-l border-line">
          {experience.map((r) => (
            <li key={r.company + r.period} className="relative pb-12 pl-8 last:pb-0">
              <span className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-accent ring-4 ring-paper" />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-lg font-semibold">{r.title}</h3>
                <span className="font-mono text-xs text-muted">{r.period}</span>
              </div>
              <p className="text-muted">
                {r.company} · {r.place}
              </p>
              <ul className="mt-3 max-w-3xl space-y-2 text-[0.97rem]">
                {r.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-line p-6">
            <p className="eyebrow">Education</p>
            <p className="mt-3 font-semibold">{education.degree}</p>
            <p className="text-sm text-muted">{education.school}</p>
            <p className="mt-1 font-mono text-xs text-muted">{education.period}</p>
          </div>
          <div className="rounded-2xl border border-line p-6">
            <p className="eyebrow">Certifications</p>
            <ul className="mt-3 space-y-3">
              {certifications.map((c) => (
                <li key={c.name}>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-muted">
                    {c.issuer} · {c.date}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line p-6">
            <p className="eyebrow">Languages</p>
            <ul className="mt-3 space-y-3">
              {languages.map((l) => (
                <li key={l.name}>
                  <p className="font-semibold">{l.name}</p>
                  <p className="text-sm text-muted">{l.level}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="container-x pt-24">
        <div id="contact" className="scroll-mt-24 overflow-hidden rounded-3xl bg-ink px-6 py-14 text-paper sm:px-12">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">Contact</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
            Need a lead engineer for a platform that has to scale?
          </h2>
          <p className="mt-4 max-w-xl text-paper/70">
            I’m based in Dubai and I run MboaSoft Solutions, the company behind E-Farmer and MboaMeet. Open to architecture consulting and technical partnerships.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition hover:opacity-90">
              {profile.email}
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="rounded-full border border-paper/25 px-5 py-2.5 text-sm font-medium transition hover:border-paper/60">
              {profile.phone}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-paper/25 px-5 py-2.5 text-sm font-medium transition hover:border-paper/60">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-full border border-paper/25 px-5 py-2.5 text-sm font-medium transition hover:border-paper/60">
              GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
