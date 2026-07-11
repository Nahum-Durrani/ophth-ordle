import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Ophth-ordle — Daily Ophthalmology Diagnosis Game";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The share-card mark: concentric rings closing toward a slate center —
// Satori (next/og's renderer) rejects the segmented conic-gradient
// FieldMapDial uses, so this redraws the same ring geometry as nested
// bordered circles, which Satori's CSS subset supports natively.
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#FAFAF8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", padding: "0 80px", gap: 72 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 260,
              height: 260,
              borderRadius: 9999,
              flexShrink: 0,
              border: "8px solid #E5E7EB",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 196,
                height: 196,
                borderRadius: 9999,
                border: "8px solid #0F766E",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 132,
                  height: 132,
                  borderRadius: 9999,
                  border: "8px solid #15803D",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: 68,
                    height: 68,
                    borderRadius: 9999,
                    backgroundColor: "#0F172A",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ display: "flex", width: 22, height: 22, borderRadius: 9999, backgroundColor: "#0F766E" }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#0F766E",
              }}
            >
              Daily Ophthalmology Diagnosis Game
            </div>
            <div style={{ display: "flex", fontSize: 96, fontWeight: 700, color: "#0F172A", lineHeight: 1.05 }}>
              Ophth-ordle
            </div>
            <div style={{ display: "flex", fontSize: 30, color: "#6B7280" }}>
              One case a day. Five clues. Five guesses.
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
