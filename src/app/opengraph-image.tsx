import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F4F2ED",
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: 22,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#A9ACA4",
            display: "flex",
          }}
        >
          {siteConfig.name} · Est. {siteConfig.established}
        </div>

        {/* Headline — split into separate divs (no mixed text + element children) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 88,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#0D1816",
              display: "flex",
            }}
          >
            Design, build &amp; finish
          </div>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 88,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#57544B",
              fontStyle: "italic",
              display: "flex",
            }}
          >
            under one roof.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #D8D2C5",
            paddingTop: 24,
          }}
        >
          <div
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 22,
              color: "#57544B",
              display: "flex",
            }}
          >
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </div>
          <div
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 22,
              color: "#D4710B",
              display: "flex",
            }}
          >
            Construction · Design · Sri Lanka
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
