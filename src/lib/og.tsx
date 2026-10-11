import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const ogSize = { width: 1200, height: 630 };

const portrait = `data:image/png;base64,${fs.readFileSync(path.join(process.cwd(), "src/app/icon.png")).toString("base64")}`;

/** Shared 1200×630 social card: eyebrow, big title, footer with avatar and domain. */
export function ogCard({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  const titleSize = title.length > 90 ? 50 : title.length > 60 ? 58 : 68;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: "#0f1114", color: "#ecebe6" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#f08a4b" }}>{eyebrow}</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: titleSize, fontWeight: 700, lineHeight: 1.12, maxWidth: 1050 }}>{title}</div>
          {subtitle && <div style={{ display: "flex", marginTop: 24, fontSize: 28, lineHeight: 1.4, color: "#9ba1ac", maxWidth: 1000 }}>{subtitle}</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "2px solid #262a31", paddingTop: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={portrait} width={72} height={72} alt="" style={{ borderRadius: 999 }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>{profile.shortName}</div>
              <div style={{ display: "flex", fontSize: 22, color: "#9ba1ac" }}>Senior Full Stack · Lead Software Engineer · Dubai</div>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#f08a4b" }}>frankfontcha.tech</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
