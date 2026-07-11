import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Restrained medical/editorial palette — replaces the earlier
        // "Instrument" (cobalt/fluorescein/hyphema) concept. Deliberate
        // pivot toward Linear/Stripe/Notion-grade premium SaaS, executed
        // with a clinical-journal restraint (minimal color, reserved for
        // state: difficulty, success, warning, danger).
        primary: "#0F172A", // slate-900 — headings, primary buttons, body ink
        secondary: "#334155", // slate-700 — secondary text
        accent: "#0F766E", // teal-700 — the one interactive/focus accent
        success: "#15803D", // green-700 — correct / easy
        warning: "#CA8A04", // amber-600 — medium difficulty
        danger: "#B91C1C", // red-700 — wrong / hard / errors
        bg: "#FAFAF8", // warm off-white page background
        card: "#FFFFFF",
        surface: "#F8FAFC", // subtle raised surface: inputs, unrevealed-clue placeholders
        border: "#E5E7EB",
        muted: "#6B7280", // secondary/meta text
      },
      fontFamily: {
        // Headings: Manrope, bold only — an editorial-medical-journal
        // display face, not a generic SaaS grotesk.
        display: ["var(--font-heading)", "system-ui", "sans-serif"],
        // Body: Inter — carries all prose.
        body: ["var(--font-body)", "-apple-system", "system-ui", "sans-serif"],
        // Labels/metadata: IBM Plex Mono, uppercase, tracked — the one
        // "clinical readout" accent, used narrowly for eyebrows and tags.
        mono: ["var(--font-label)", "'SFMono-Regular'", "monospace"],
      },
      fontSize: {
        // meta: mono readout labels/eyebrows/badges only.
        // body: base prose (clue findings, menu copy).
        // lede: the case-presentation description — larger, more comfortable.
        // headline / headline-lg: section headers and the diagnosis reveal /
        // presentation title respectively.
        meta: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.12em" }],
        body: ["1rem", { lineHeight: "1.6" }],
        lede: ["1.125rem", { lineHeight: "1.7" }],
        headline: ["1.75rem", { lineHeight: "1.25" }],
        "headline-lg": ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        card: "20px",
      },
      boxShadow: {
        // Near-invisible elevation — never a heavy drop shadow.
        card: "0 8px 30px rgba(15, 23, 42, 0.04)",
        floating: "0 12px 40px rgba(15, 23, 42, 0.10)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
