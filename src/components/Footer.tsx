import Image from "next/image";
import { profile } from "@/content/profile";

const apps = [
  {
    name: "E-Farmer",
    url: "https://e-farmer.app",
    logo: "/logos/e-farmer.png",
    blurb: "AI-powered livestock & crop management",
  },
  {
    name: "MboaMeet",
    url: "https://mboameet.com",
    logo: "/logos/mboameet.png",
    blurb: "Social & creator-commerce platform",
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="container-x py-10">
        <p className="eyebrow">My apps</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:max-w-3xl">
          {apps.map((app) => (
            <li key={app.url} className="min-w-0">
              <a
                href={app.url}
                target="_blank"
                rel="noopener"
                title={`${app.name}: ${app.blurb}`}
                className="group flex min-w-0 items-center gap-4 rounded-2xl border border-line p-3 transition hover:border-ink/25 hover:bg-paper-2/60"
              >
                <Image src={app.logo} alt={`${app.name} logo`} width={48} height={48} className="size-12 shrink-0 rounded-xl border border-line object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold group-hover:text-accent">{app.name}</span>
                  <span className="block truncate text-sm text-muted">
                    {app.url.replace("https://", "")} · {app.blurb}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="container-x flex flex-col gap-4 border-t border-line py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a href={profile.github} target="_blank" rel="noreferrer me" className="hover:text-ink">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer me" className="hover:text-ink">LinkedIn</a>
          <a href={`mailto:${profile.email}`} className="hover:text-ink">Email</a>
          <a href={profile.cv} className="hover:text-ink">CV (PDF)</a>
        </div>
      </div>
    </footer>
  );
}
