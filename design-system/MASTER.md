# Ophth-ordle — Design System (MASTER)

Generated via the `ui-ux-pro-max` skill's `--design-system` search, then
**overridden by hand** because the generator's product-category match is
wrong for this project. This file is the source of truth; nothing gets
implemented until the user signs off on it. Presentation only — this file
never governs `lib/game.ts`, `lib/storage.ts`, or `data/`.

---

## 1. What the generator proposed, and why it's rejected

Raw output (`search.py "... ophthalmology instrument-inspired NYT games
playful rigorous" --design-system`):

| Dimension | Generator said | Verdict |
|---|---|---|
| Style | **Claymorphism** — soft 3D, chunky, bubbly, thick 3–4px borders, double shadows, 16–24px radius | ❌ Reject |
| Palette | Pink `#EC4899` / purple `#8B5CF6` / amber `#F59E0B`, "cheerful pink + reward gold" | ❌ Reject |
| Typography | Figtree + Noto Sans, mood tags "medical, clean, healthcare, trustworthy" | ❌ Reject |

Why: the tool has no category for "diagnostic-instrument aesthetic" — it
pattern-matched on "medical" + "game" and produced two incompatible defaults
stapled together (a children's-app claymorphism style bolted onto generic
hospital-brochure typography and mood words). Claymorphism's bubbly/toy-like
identity fights the brief directly: this needs to read as *precise
instrument*, not *toy*. Widening the search (`style`/`color`/`typography`
domains individually, queried for "precision instrument scientific
editorial") surfaced Swiss Modernism, E-Ink/Paper, and mono/sans developer
pairings — closer in spirit, but still generic SaaS/dashboard/editorial
tropes with no ophthalmic grounding, and several (dark-mode-primary, heavy
serif) directly conflict with this project's light-mode-only and
single-custom-font constraints. None of the 161 stock palettes or 57 font
pairings are written for "the instruments an ophthalmologist actually uses,"
because that's not a stock product category — so this project needed a
bespoke direction, not a database lookup.

The codebase already committed to exactly that bespoke direction — the
**Perimetry concept** (see `CLAUDE.md` → "Design direction"), built before
this session. It is *not* being replaced. This document formalizes it,
supplies the missing contrast math, and extends it with the specific
instrument references the user asked for that weren't in the app yet
(Ishihara plates, fundus photography, iris geometry as a systemic rule
rather than a single component).

---

## 2. Committed direction: "Instrument"

**Thesis:** every visual element should trace back to something an
ophthalmologist actually looks through or at — never a generic medical
signifier (no caduceus, no stethoscope, no cross, no navy-and-serif
hospital-brochure look), and never a bubbly "learning app" toy aesthetic.
Feels like *NYT Games' Connections* crossed with *a slit-lamp readout* — a
confident, minimal, mobile-first game shell wearing exactly one piece of
clinical texture at a time.

| Real instrument / phenomenon | Already in the app | Formalized rule (this doc) |
|---|---|---|
| **Slit lamp, cobalt-blue filter** — the light that makes fluorescein fluoresce | `cobalt` (`#0047AB`) primary accent | Cobalt is the *only* accent used for interactive/focus chrome. Never pair it with a second accent for the same purpose. |
| **Corneal fluorescein stain** | `fluorescein` / `fluorescein-ink` = correct-state color | Fill-only color (§3) stays fill-only — see contrast note, it's not legible as text. |
| **Blood in the anterior chamber (hyphema)** | `hyphema` = wrong-state color | No change. |
| **Amsler grid** (macular self-monitoring chart) | `.field-grid` background texture | No change — stays the one ambient texture on the page background. |
| **Perimetry clock-hour sectors, iris concentric rings** | `FieldMapDial` (5-sector ring) | **New system-wide rule:** any future circular data (guess distribution, stats) reuses this sector/ring geometry — don't invent a second circular-chart language. |
| **A finding sharpening into focus as a lens dials in** | `.clue-reveal` / `focus-in` keyframe (blur→sharp, 0.5s ease-out) | **New system-wide rule (§5):** this exact class is the *only* thing allowed to use blur. It marks "a clinical finding is being revealed" — clues, `ResultBanner`. Routine UI chrome (dropdown open, menu open) must not reuse blur, or the motif stops meaning anything. |
| **Ishihara plate** (colored-dot pseudoisochromatic test) | Not yet used | **New, optional, needs your sign-off (§7):** a stippled-dot texture as an alternate treatment for the guess-distribution bars — dot density under color, not color alone, which is also a genuine WCAG win (`color-not-only`) since fluorescein/hyphema green-vs-red is exactly the pair colorblind users struggle with. |
| **Fundus photograph** (circular retinal photo, dark vignette at the rim) | Not yet used | **New, optional, needs your sign-off (§7):** the *circular framing*, not fundus-red color, borrowed as the shape for the still-missing favicon/OG image — a filled dot-ring mark (reuses `FieldMapDial` geometry) sitting inside a circular vignette, instead of Next.js's default icon. |

Nothing in this table requires a new dependency. Everything is CSS
(gradients, `clip-path`, existing keyframe) or plain SVG.

---

## 3. Palette (existing, formalized with measured contrast)

All ratios computed via WCAG relative-luminance, not estimated.

| Token | Hex | Role | vs `card` #FFF | vs `field` #F2F3F5 |
|---|---|---|---|---|
| `pupil` | `#12161C` | primary text | **18.15:1** ✅ AAA | **16.34:1** ✅ AAA |
| `vitreous` | `#616A75` | secondary text / hairline borders | **5.49:1** ✅ AA | **4.94:1** ✅ AA |
| `cobalt` | `#0047AB` | primary accent, focus ring, links | **8.44:1** ✅ AAA | **7.60:1** ✅ AAA |
| `fluorescein-ink` | `#5C7A1E` | correct-state **text/icon** | **4.93:1** ✅ AA | **4.44:1** ⚠️ borderline, rounds to AA |
| `fluorescein` | `#9FCB3B` | correct-state **fill only** | **1.90:1** ❌ never place text on this or use it as a text color — existing code already treats it as fill-only, this just confirms the number |
| `hyphema` | `#96312E` | wrong-state, always on `card`/`mist` | **7.57:1** ✅ AAA | **6.81:1** ✅ AAA |
| `line` | `#DCE0E4` | dividers, unrevealed-clue outline | **1.33:1** (by design — a hairline, not a text pair) | — |

**Fixed, not just flagged:** `vitreous` was `#6B7480` (4.26:1 vs `field`,
failing AA for small text). Darkened ~2% in lightness, same hue, to
`#616A75` — now 4.94:1 vs `field` / 5.49:1 vs `card`, clearing AA against
both surfaces with margin. Changed in `tailwind.config.ts`; no component
code needed to change since every usage already went through the token.

No new hues are being added. `cobalt` / `fluorescein` / `hyphema` is a
closed, intentional 3-accent system (instrument-blue, stain-green,
blood-red) — resist the urge to add a 4th for a new feature; reuse one of
these three or fall back to `pupil`/`vitreous` neutrals.

---

## 4. Typography pairing (existing, formalized — generator's pairing explicitly rejected)

| | Font | Use |
|---|---|---|
| Display/mono | **JetBrains Mono** (weights 500/700), loaded via `next/font/google` in `app/layout.tsx` | Headlines, labels, numerals only — the "instrument readout" accent |
| Body | **system-ui** stack (`-apple-system`, `Segoe UI`, sans-serif) | All prose: clues, teaching points, menu copy |

Rejecting the generator's **Figtree + Noto Sans** suggestion: those two
fonts are exactly what the tool tags "healthcare, clean, trustworthy" —
i.e., generic hospital-website typography, the opposite of what this brief
asked for. Also rejecting the "Developer Mono" pairing it surfaced on the
narrower style query (JetBrains Mono + IBM Plex Sans) for a simpler reason:
adding IBM Plex Sans as a second custom font contradicts the project's
existing, deliberate stance — *"All prose... uses the plain system-ui
stack — no second custom font to load or justify"* (`CLAUDE.md`). One
loaded face, used narrowly, stays the rule.

---

## 5. Motion

- The **only** CSS animation in the app is `.clue-reveal` (`focus-in`
  keyframe: opacity 0→1, blur 6px→0, translateY 4px→0, 0.5s ease-out),
  already wired to `prefers-reduced-motion: reduce` → `animation: none`.
- **New rule, not new motion:** blur is reserved for this one keyframe and
  the "a finding is being revealed" meaning it carries. Anything else that
  needs a subtle appear/disappear (autocomplete suggestions, hamburger
  drawer — the drawer and `Modal`-based dialogs are explicitly
  zero-transition by prior instruction, don't touch) should use opacity/
  translate *without* blur if it needs motion at all, so blur keeps
  meaning "clinical reveal" and doesn't become decorative.
- No easing curve, duration, or keyframe changes anywhere in this document.

---

## 6. Anti-pattern list

Project-specific (in priority order) — merged with the generic skill
checklist where relevant:

1. **No Doctordle imitation** — no navy header, no warm serif display face,
   no sage-teal accent, no dotted-grid background. (Explicit non-goal,
   already stated in `CLAUDE.md`.)
2. **No generic clinical iconography** — no caduceus, stethoscope, red
   cross, heartbeat-line, pill capsule. Every visual reference must trace
   to something in §2's instrument table, or it doesn't belong.
3. **No claymorphism / bubbly-toy treatment** — no thick 3–4px borders, no
   double/inner+outer shadows, no 16–24px "chunky" radii. This is a
   precision-instrument aesthetic, not a children's-app one, even though
   the audience plays it like a game.
4. **No second custom font.** JetBrains Mono stays the only loaded face.
5. **No new accent hues.** Reuse `cobalt` / `fluorescein` / `hyphema` /
   neutrals — don't introduce a 4th "brand" color for a new feature.
6. **No decorative motion.** Blur is reserved for `.clue-reveal` only (§5);
   no scroll-triggered reveals, no parallax, no hover-lift shadows.
7. **No re-coupling clues and guesses** — don't put clue numbers back onto
   `ClueCard`; numbering stays exclusive to `GuessHistory` pills. (Explicit
   game-rule constraint, not just visual — see `CLAUDE.md` → "Game rules.")
8. **No emoji as icons** — SVG only, consistent stroke width.
9. **No color-only signal** — `fluorescein`/`hyphema` (green/red) is close
   to the exact pair colorblind users confuse; every correct/wrong state
   must also carry an icon or text (✗ in `GuessHistory`, banner copy in
   `ResultBanner`), never color alone. This is also the reasoning for the
   optional Ishihara-dot treatment in §7.
10. **No transitions on the hamburger drawer or `Modal`-based dialogs** —
    confirmed deliberate in a prior session; don't "fix" this without
    checking first.
11. **Disclaimer line stays visible, unstyled-down.** `Game.tsx`'s "For
    medical education only. This is not medical advice." footer must not
    be removed, hidden behind a toggle, or shrunk further than its current
    11px/`vitreous`-on-`card` treatment (4.74:1, passes AA).

---

## 7. Open items — resolved, and what shipped

Both approved and implemented:

1. **Ishihara-dot texture** — shipped on `GuessDistribution` bars only
   (`.ishihara-dots` in `globals.css`): both the highlighted (`fluorescein`)
   and muted (`vitreous`) fills carry a `radial-gradient(currentColor ...)`
   dot layer, at different densities/opacity so "your attempt" still reads
   without relying on color alone. Not applied to the Stats modal
   background — kept to the data itself.
2. **Favicon / OG image** — shipped as `app/icon.svg` (static file
   convention, no code) and `app/opengraph-image.tsx` (`next/og`
   `ImageResponse`, bundled with Next — no new dependency). **Design
   deviation from the original plan:** the favicon still uses the
   `FieldMapDial` segmented-ring SVG (raw `<circle>` + `stroke-dasharray`,
   same math as the component), but the OG image does **not** — Satori
   (the renderer behind `next/og`) rejected the multi-stop
   `conic-gradient(...)` syntax needed to fake that ring in CSS
   (`Invalid background image` at build time). The OG image instead uses
   **concentric bordered circles** (an iris-ring reading, literally closer
   to §2's "concentric geometry of the iris" row than a segmented dial) —
   cobalt outer ring, fluorescein inner ring, pupil-dark center, cobalt
   reflex dot. Any future OG/share-image work should keep using
   div+border circles, not conic-gradient, or verify Satori's CSS subset
   support first.

Also fixed in the same pass: the §3 `vitreous` contrast failure —
`#6B7480` → `#616A75` (4.26:1 → 4.94:1 vs `field`, 5.49:1 vs `card`), same
hue, ~2% darker, in `tailwind.config.ts`.

---

## 8. Pre-delivery checklist (merged: skill defaults + this project's hard constraints)

**Accessibility / contrast**
- [x] `vitreous` fixed at the token level (§3/§7) — no per-usage exception
      tracking needed anymore
- [x] `fluorescein` never used as a text/icon color, fill only
- [x] All new UI reuses `cobalt`/`fluorescein-ink`/`hyphema` for meaning;
      correct/wrong always paired with icon or text, never color alone
- [x] Focus-visible ring (`:focus-visible`, 2px `cobalt`, 2px offset)
      present and undisturbed on every interactive element touched
- [x] `prefers-reduced-motion: reduce` still collapses `.clue-reveal` to
      no animation; no new animation introduced without the same guard

**Motion**
- [x] No new keyframes added; blur stays exclusive to `.clue-reveal` —
      reused (not reinvented) for the wrong-guess "Not quite" beat and the
      newly-committed `GuessHistory` pill
- [x] Hamburger drawer and `Modal` dialogs remain transition-free

**Typography / color**
- [x] No second custom font loaded
- [x] No 4th accent hue introduced
- [x] JetBrains Mono stays confined to headlines/labels/numerals, never
      body prose (the vignette headline uses the *body* font at headline
      size — still prose, just promoted in scale, not switched to mono)

**Layout**
- [x] Mobile-first; verified at 375–430px via headless-Chrome screenshots
- [x] No horizontal scroll introduced
- [x] Touch targets ≥44×44px maintained on any touched interactive element

**Game rules / structural**
- [x] Clue slots stay unnumbered; `GuessHistory` remains the only numbered
      surface
- [x] Medical disclaimer line remains visible and unchanged in placement
- [x] `lib/game.ts`, `lib/storage.ts`, `data/` untouched (presentation-only
      pass — confirmed via `git diff --stat`)

**Build**
- [x] `npm run build` passes — both `/` and `/team` prerender `○ (Static)`,
      plus the two new routes `/icon.svg` and `/opengraph-image`
- [x] No new npm dependency added (`package.json`/`package-lock.json`
      unchanged — `next/og` ships inside the already-installed `next`
      package)

---

*§7 resolved and implemented (2026-07-09): five diagnosed defects fixed
(anchor, type scale, unrevealed-slot texture, role differentiation, the
wrong-guess "moment"), the `vitreous` contrast failure fixed at the token
level, Ishihara-dot distribution bars shipped, and the favicon/OG image
built. Verified with `npm run build` and a headless-Chrome-driven
end-to-end pass (autocomplete → wrong guess → clue reveal → history pill).*
