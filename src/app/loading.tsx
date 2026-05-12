export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[60vh] items-center justify-center"
    >
      <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle">
        Loading
        <span className="ml-2 inline-block animate-pulse">·</span>
      </span>
    </div>
  );
}
