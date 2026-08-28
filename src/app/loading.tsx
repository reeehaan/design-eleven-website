export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[60vh] items-center justify-center"
    >
      <span className="font-meta text-meta-sm uppercase text-zinc">
        Loading
        <span className="ml-2 inline-block animate-pulse">·</span>
      </span>
    </div>
  );
}
