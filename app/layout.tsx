import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ophthodle — Daily Ophthalmology Diagnosis Game",
  description:
    "One clinical case a day. Five clues, five guesses. Sharpen your ophthalmology diagnostic reasoning.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink text-paper font-body antialiased">
        {children}
      </body>
    </html>
  );
}
