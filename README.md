# frankfontcha.tech

Portfolio and engineering blog of Frank Donald Kamga Fontcha. Built with Next.js 16 (App Router, static export), Tailwind CSS 4 and MDX.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Edit content

| What | Where |
|---|---|
| Name, contact, stats, skills, experience, education, certifications | `src/content/profile.ts` |
| Projects (cards + `/projects/<slug>` pages) | `src/content/projects.ts` |
| Blog posts | `src/content/posts/<slug>.mdx` |
| CV PDF | `public/cv/frank-fontcha-cv.pdf` |
| Portrait / screenshots | `public/frank-portrait.jpg`, `public/projects/` |

### Writing a post

Create `src/content/posts/my-post.mdx`:

```mdx
---
title: "What the reader learns"
summary: "Two sentences: problem and what the post shows."
date: "2026-10-10"
project: "pro-e-farmer"   # slug from projects.ts — links the post to that project
tags: ["NestJS", "Redis"]
---

Intro…

<Flow steps={[
  ["Mobile app", "Sends the request with an Idempotency-Key"],
  ["API", "Looks up the key and replays the stored result"],
]} />

<Callout tone="warn">A gotcha.</Callout>   {/* tones: note | warn | tip */}
```

Code fences get syntax highlighting; add `title="file.ts"` after the language for a filename label. See `WRITING_GUIDE.md` for the house style.

## Build & deploy

```bash
npm run build                  # production build (.next/standalone)
npm start                      # production server: http://localhost:3011
docker compose up -d --build   # container: http://localhost:3011
```

The Docker image runs the Next.js standalone Node server (`node server.js`) on port **3011** (Next default 3000 + 11), as a non-root user. Put your reverse proxy in front of it. Change the port with the `PORT` variable, e.g. `PORT=3000 docker compose up -d`. No other environment variables.

### CI/CD (same flow as the E-Farmer web)

- **CI** (`.github/workflows/ci.yml`): on pull requests to `develop` or `main`, it lints, builds the site and builds the Docker image.
- **CD** (`.github/workflows/cd.yml`): on push to `develop` or `main`, it SSHes into the server, clones or pulls this repo into `/home/<APP_FOLDER>/<repo>`, then runs `docker-compose stop`, `build --no-cache` and `up -d` for the service in the server's shared compose file.

**Repository secrets.** The SSH ones are the same values as the E-Farmer web repo.

| Secret | Value |
|---|---|
| `SSH_HOST`, `SSH_PORT`, `SSH_USERNAME`, `SSH_PRIVATE_KEY` / `SSH_PASSWORD`, `SSH_PASSPHRASE` | same as E-Farmer |
| `APP_FOLDER` | same as E-Farmer (the folder under `/home` holding `docker-compose.yml`) |
| `PAT` | GitHub token with read access to this repo |
| `PORTFOLIO_REPO_NAME` | name of this GitHub repo (also the folder it is cloned into) |
| `DEVELOP_PORTFOLIO_REPO_NAME` | folder for the `develop` clone, e.g. `frank-portfolio-develop` (only if you deploy `develop`) |

**No server-side compose edits are needed.** The CD runs this repo's own `docker-compose.yml` as a separate compose project, so it never touches the other services in `/home/<APP_FOLDER>/docker-compose.yml`:

| Branch | Compose project | Port |
|---|---|---|
| `main` | `frank-portfolio` | 3011 |
| `develop` | `frank-portfolio-develop` | 3012 |

**Point the domain at the container.** In Plesk, under *frankfontcha.tech*, turn off the old Node.js app, then in *Apache & nginx Settings → Additional nginx directives* add:

```nginx
location / {
    proxy_pass http://127.0.0.1:3011;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

The sitemap is at `/sitemap.xml`.
