import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  project: string; // project slug
  tags: string[];
  readingMinutes: number;
};

export type Post = PostMeta & { body: string };

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title,
    summary: data.summary,
    date: data.date,
    project: data.project,
    tags: data.tags ?? [],
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    body: content,
  };
}

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f): PostMeta => {
      const { body, ...meta } = readPost(f); // eslint-disable-line @typescript-eslint/no-unused-vars
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  const file = `${slug}.mdx`;
  if (!fs.existsSync(path.join(POSTS_DIR, file))) return undefined;
  return readPost(file);
}

export function getPostsForProject(projectSlug: string): PostMeta[] {
  return getAllPosts().filter((p) => p.project === projectSlug);
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
