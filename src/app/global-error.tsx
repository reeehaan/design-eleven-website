"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: "48px 24px",
          background: "#F3EFE8",
          color: "#231E19",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <p
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 11,
              letterSpacing: "0.08em",
              
              color: "#6A5D51",
              margin: 0,
            }}
          >
            Critical error
          </p>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 48,
              lineHeight: 1.1,
              margin: "16px 0 0 0",
              fontWeight: 400,
            }}
          >
            Something broke badly.
          </h1>
          <p style={{ margin: "16px 0 32px 0", color: "#4A3F36", fontSize: 17 }}>
            Refresh the page to try again. If this keeps happening, please call
            us, we&rsquo;d still love to hear from you.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#231E19",
              color: "#F3EFE8",
              border: "none",
              padding: "12px 24px",
              borderRadius: 999,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
