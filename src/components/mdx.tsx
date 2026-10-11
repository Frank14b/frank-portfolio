import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

function Callout({ title, children, tone = "note" }: { title?: string; children: React.ReactNode; tone?: "note" | "warn" | "tip" }) {
  const label = title ?? { note: "Note", warn: "Gotcha", tip: "Takeaway" }[tone];
  return (
    <aside className={`rounded-xl border p-5 ${tone === "warn" ? "border-accent/40 bg-accent-soft/60" : "border-line bg-paper-2"}`}>
      <p className="mb-1 font-mono text-xs uppercase tracking-wider text-accent">{label}</p>
      <div className="space-y-3 text-[0.98rem] [&_p]:text-ink/85">{children}</div>
    </aside>
  );
}

/** A numbered sequence: each step names the actor doing the work. */
function Flow({ steps }: { steps: [actor: string, action: string][] }) {
  return (
    <ol className="!list-none !pl-0 rounded-xl border border-line bg-paper-2/60 p-2 sm:p-3">
      {steps.map(([actor, action], i) => (
        <li key={i} className="!mt-0 grid grid-cols-[2rem_1fr] gap-x-3 gap-y-1 rounded-lg p-2.5 sm:grid-cols-[2rem_9rem_1fr]">
          <span className="grid size-7 place-items-center rounded-full bg-ink font-mono text-xs text-paper">{i + 1}</span>
          <span className="self-center font-mono text-[0.72rem] font-medium uppercase tracking-wide text-accent">{actor}</span>
          <span className="col-start-2 text-[0.95rem] leading-relaxed sm:col-start-3 sm:self-center">{action}</span>
        </li>
      ))}
    </ol>
  );
}

const components = { Callout, Flow };

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: false }]],
        },
      }}
    />
  );
}
