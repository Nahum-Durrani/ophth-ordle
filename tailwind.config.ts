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
        vitreous: "#6B7480", // secondary text, hairline borders
        line: "#DCE0E4",
        reflex: "#C1442D", // primary accent: the ophthalmoscope's red reflex
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
    },
  },
  plugins: [],
};
export default config;
