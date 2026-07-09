import type { Metadata } from "next";
import Link from "next/link";
import { JetBrains_Mono } from "next/font/google";
import FieldMapDial from "@/components/FieldMapDial";
import SiteMenu from "@/components/SiteMenu";
import "./globals.css";

// Every headline/label reads like it came off an instrument printout —
// system-ui carries the actual prose so the mono stays a deliberate accent,
// not a wall of monospace.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Ophth-ordle — Daily Ophthalmology Diagnosis Game",
  description:
    "One clinical case a day. Five clues, five guesses. Sharpen your ophthalmology diagnostic reasoning.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <body className="min-h-screen bg-field text-pupil font-body antialiased">
        <header className="grid grid-cols-[2rem_1fr_2rem] items-center bg-pupil px-4 py-4">
          <SiteMenu />
          <Link href="/" className="flex items-center justify-center gap-3">
            <FieldMapDial
              decorative
              size={28}
              sectors={["correct", "wrong", "empty", "empty", "empty"]}
            />
            <div>
              <p className="font-display text-lg font-bold tracking-tight text-white">
                Ophth-ordle
              </p>
              <p className="text-xs text-white/60">
                One case a day. Five clues. Name the diagnosis.
              </p>
            </div>
          </Link>
          <div aria-hidden />
        </header>
        <div className="field-grid flex min-h-[calc(100vh-4.5rem)] flex-col items-center px-4 py-10 sm:py-14">
          {children}
        </div>
      </body>
    </html>
  );
}
