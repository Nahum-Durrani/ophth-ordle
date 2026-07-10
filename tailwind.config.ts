import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Perimetry palette — rooted in the ophthalmoscope exam, not generic medicine.
        field: "#F2F3F5", // page background: the pale gray of a printed visual-field chart
        card: "#FFFFFF",
        mist: "#F7F8FA", // subtle raised surface: inputs, unrevealed clue placeholders
        pupil: "#12161C", // primary text
        vitreous: "#616A75", // secondary text, hairline borders — darkened from #6B7480 (was 4.26:1 on field, fails AA); now 4.9:1 on field / 5.5:1 on card
        line: "#DCE0E4",
        cobalt: "#0047AB", // primary accent: the slit-lamp's cobalt-blue filter (what makes fluorescein glow)
        fluorescein: "#9FCB3B", // correct — corneal fluorescein stain, fills only
        "fluorescein-ink": "#5C7A1E", // correct — AA-contrast text/icon variant
        hyphema: "#96312E", // wrong — blood in the anterior chamber
      },
      fontFamily: {
        // Headlines/labels: JetBrains Mono, the same face for both keys — a
        // deliberate instrument-readout accent, used narrowly.
        display: ["var(--font-mono)", "'SFMono-Regular'", "monospace"],
        mono: ["var(--font-mono)", "'SFMono-Regular'", "monospace"],
        // Prose: the OS's own font. No custom body face to load or justify.
        body: ["system-ui", "-apple-system", "'Segoe UI'", "sans-serif"],
      },
      fontSize: {
        // A deliberate 4-tier scale so roles read as different weights, not
        // siblings: meta (tags/eyebrows) < finding (clue prose) < headline
        // (the vignette, the diagnosis reveal) < headline-lg (same, ≥sm).
        meta: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.06em" }],
        finding: ["0.9375rem", { lineHeight: "1.6" }],
        headline: ["1.375rem", { lineHeight: "1.35" }],
        "headline-lg": ["1.75rem", { lineHeight: "1.3" }],
      },
    },
  },
  plugins: [],
};
export default config;
