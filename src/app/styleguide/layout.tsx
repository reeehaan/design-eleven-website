import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-ds="survey">
      {/* The site chrome is hidden here so the token specimen can be judged on
          its own. Scoped <style> unmounts with the layout on navigation away. */}
      <style>{`
        body > header, body > footer { display: none; }
      `}</style>
      {children}
    </div>
  );
}
