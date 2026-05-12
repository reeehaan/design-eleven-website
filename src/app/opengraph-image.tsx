import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const baseText = {
  fontFamily: "Georgia, serif",
  fontSize: 80,
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
};

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
            fontSize: 20,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#A9ACA4",
            display: "flex",
          }}
        >
          {siteConfig.name} · Est. {siteConfig.established}
        </div>

        {/* Headline — three separate lines to avoid mixed text/element children */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ ...baseText, color: "#0D1816", display: "flex" }}>
            Building Sri Lanka&apos;s homes &amp; spaces,
          </div>
          <div style={{ ...baseText, color: "#57544B", fontStyle: "italic", display: "flex" }}>
            one honest project
          </div>
          <div style={{ ...baseText, color: "#0D1816", display: "flex" }}>
            at a time.
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
            style={{ fontFamily: "ui-monospace, monospace", fontSize: 20, color: "#57544B", display: "flex" }}
          >
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </div>
          <div
            style={{ fontFamily: "ui-monospace, monospace", fontSize: 20, color: "#D4710B", display: "flex" }}
          >
            Architecture · Construction · Colombo
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
