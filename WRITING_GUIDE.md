# Blog post writing guide (frank-portfolio)

Posts live in `src/content/posts/<slug>.mdx`. The reference post is `transactional-outbox-bullmq.mdx`: read it first and match its voice, structure and length (1,200–2,000 words).

## Frontmatter
```
---
title: "Specific, benefit-led title (what the reader learns)"
summary: "2 sentences: the problem and what this post shows."
date: "YYYY-MM-DD"
project: "<project slug from src/content/projects.ts>"
tags: ["4–6", "short", "tags"]
---
```

## Structure
1. Open with the concrete problem in the owner's app (first person, "I"), in 1–3 short paragraphs. No throat-clearing.
2. `<Flow steps={[["Actor", "what happens"], ...]} />` for the end-to-end sequence (5–9 steps). Actors are short (e.g. "Mobile app", "API", "Worker", "Postgres").
3. `## ` sections walking through the key steps, each with a trimmed real code snippet (fenced with a language and `title="file.ts"`, ≤ 25 lines, paraphrased from the real source; never invent APIs that aren't there).
4. `<Callout tone="warn">…</Callout>` for real gotchas, `<Callout tone="tip">` for takeaways. 1–3 per post.
5. Close with `## What I'd tell you before you build one` (or similar): reusable lessons, including what the owner would change. Frame weaknesses as honest lessons, constructively.

## Rules
- Use first person ("I built…"). The author is Frank Fontcha, a senior full stack / lead engineer.
- **Accuracy over polish.** Every claim must be backed by the source code you read. If something is a plan or TODO, say so or leave it out. Don't inflate.
- **Security.** Never include secrets, API keys, private hostnames or admin domains, salts/hash seeds, keystore details, internal IPs, or any detail that would help someone attack a LIVE app (e.g. weak auth schemes, open CORS, injectable params, shared DB connections). Leave those out entirely; don't even hint at them.
- No client or organisation names beyond what is in `src/content/projects.ts`.
- MDX: escape `<` and `{` in prose (use `&lt;` or backticks). JSX attribute strings in `<Flow>` must not contain unescaped double quotes; use single quotes or typographic quotes inside them.
- American English, short paragraphs, no emojis except sparingly inside code comments, no marketing fluff ("revolutionary", "seamless", "leverage").
- Use `##` for sections (h2) and `###` sparingly. Don't repeat the title as an h1.
