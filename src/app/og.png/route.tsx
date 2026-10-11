import { ogCard } from "@/lib/og";

export const dynamic = "force-static";

export function GET() {
  return ogCard({
    eyebrow: "Dubai, UAE · 8+ years",
    title: "I build platforms that hold up under load.",
    subtitle: ".NET · Node.js · Next.js · React Native · WebRTC · AI/RAG. Scaled systems to 500,000+ users.",
  });
}
