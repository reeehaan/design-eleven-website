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
          background: "#F0F0EC",
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
            color: "#656D6A",
            display: "flex",
          }}
        >
          {siteConfig.name} · Est. {siteConfig.established}
        </div>

        {/* Headline — split into separate divs (no mixed text + element children) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 88,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#0E1417",
              display: "flex",
            }}
          >
            Design, build &amp; finish
          </div>
          <div
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 88,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#3A423F",
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
            borderTop: "1px solid #C9CBC4",
            paddingTop: 24,
          }}
        >
          <div
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 22,
              color: "#3A423F",
              display: "flex",
            }}
          >
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </div>
          <div
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 22,
              color: "#BF4317",
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
