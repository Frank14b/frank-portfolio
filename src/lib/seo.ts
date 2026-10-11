import { profile } from "@/content/profile";

export const siteTitle = `${profile.shortName} | Senior Full Stack Developer & Lead Software Engineer in Dubai`;

export const siteDescription =
  "Frank Fontcha is a Senior Full Stack Developer and Lead Software Engineer in Dubai with 8+ years building high-concurrency web, mobile and real-time platforms: .NET, Node.js/NestJS, React/Next.js, React Native, WebRTC and applied AI/RAG.";

export const keywords = [
  "Frank Fontcha",
  "Frank Donald Kamga Fontcha",
  "Senior Full Stack Developer",
  "Lead Software Engineer",
  "Full Stack Developer Dubai",
  "Software Engineer UAE",
  "ASP.NET Core developer",
  "NestJS developer",
  "Next.js developer",
  "React Native developer",
  "WebRTC engineer",
  "RAG / LLM engineer",
  "System design",
  "Pro E-Farmer",
  "MboaMeet",
];

export const absUrl = (path = "/") => new URL(path, profile.siteUrl).toString();

/** Person schema shared by every JSON-LD graph. */
export const personLd = {
  "@type": "Person",
  "@id": absUrl("/#person"),
  name: profile.name,
  alternateName: profile.shortName,
  url: absUrl("/"),
  image: absUrl("/frank-portrait.jpg"),
  jobTitle: "Senior Full Stack Developer / Lead Software Engineer",
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  worksFor: { "@type": "Organization", name: "LMNTO Performance Information Technology L.L.C." },
  alumniOf: { "@type": "CollegeOrUniversity", name: "African Institute of Informatics (IAI-Cameroon)" },
  knowsLanguage: ["fr", "en"],
  knowsAbout: [
    "Software architecture", "Distributed systems", "ASP.NET Core", "Node.js", "NestJS", "Next.js", "React",
    "React Native", "WebRTC", "Real-time systems", "PostgreSQL", "Redis", "Kubernetes", "Retrieval-augmented generation",
  ],
  sameAs: [profile.linkedin, profile.github],
};

export const websiteLd = {
  "@type": "WebSite",
  "@id": absUrl("/#website"),
  url: absUrl("/"),
  name: profile.shortName,
  description: siteDescription,
  inLanguage: "en",
  publisher: { "@id": absUrl("/#person") },
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(it.path) })),
  };
}

/** Open Graph / Twitter image entry for a generated og.png. */
export function ogImage(path: string, alt: string) {
  return { url: path, width: 1200, height: 630, alt, type: "image/png" };
}
