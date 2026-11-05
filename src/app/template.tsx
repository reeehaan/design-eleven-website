/**
 * The page transition lives in <PageTransition /> in the root layout, where it
 * can cover the old page before the route changes. Nothing to wrap here.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
