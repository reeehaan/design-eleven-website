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
          background: "#F0F0EC",
          color: "#0E1417",
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
              textTransform: "uppercase",
              color: "#656D6A",
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
          <p style={{ margin: "16px 0 32px 0", color: "#3A423F", fontSize: 17 }}>
            Refresh the page to try again. If this keeps happening, please call
            us — we&rsquo;d still love to hear from you.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#0E1417",
              color: "#F0F0EC",
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
