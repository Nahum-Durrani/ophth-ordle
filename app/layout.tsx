import type { Metadata } from "next";
import Link from "next/link";
import { Manrope, Inter, IBM_Plex_Mono } from "next/font/google";
import FieldMapDial from "@/components/FieldMapDial";
import SiteMenu from "@/components/SiteMenu";
import "./globals.css";

// Three-tier editorial-medical type system: Manrope carries headings, Inter
// carries all prose, IBM Plex Mono is reserved for uppercase/tracked labels
// and metadata only — never body text. All self-hosted via next/font, same
// zero-runtime-dependency mechanism the single previous font used.
const heading = Manrope({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-heading",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});
const label = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-label",
});

const title = "Ophth-ordle — Daily Ophthalmology Diagnosis Game";
const description =
  "One clinical case a day. Five clues, five guesses. Sharpen your ophthalmology diagnostic reasoning.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} ${label.variable}`}>
      <body className="min-h-screen bg-bg font-body text-primary antialiased">
        <div aria-hidden className="grain" />
        {/* Shorter, quieter header: light surface, thin divider, logo left,
            menu right — no solid dark bar (that read too close to the
            navy-header "medical brochure" look this product deliberately
            avoids). */}
        <header className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
            <Link href="/" className="flex items-center gap-3">
              <FieldMapDial
                decorative
                size={26}
                sectors={["correct", "wrong", "empty", "empty", "empty"]}
              />
              <div>
                <p className="font-display text-base font-bold tracking-tight text-primary">
                  Ophth-ordle
                </p>
                <p className="hidden text-xs text-muted sm:block">
                  One case a day. Five clues. Name the diagnosis.
                </p>
              </div>
            </Link>
            <SiteMenu />
          </div>
        </header>
        <div className="flex min-h-[calc(100vh-4.5rem)] flex-col items-center px-6 py-14 sm:py-20">
          {children}
        </div>
      </body>
    </html>
  );
}
