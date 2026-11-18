import { ImageResponse } from "next/og";

export const alt = "ECO-CHOICE: Every Action Leaves a Footprint.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#103B2A,#174D35 60%,#3C8D5A)", color: "#fff" }}>
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#A8C5A0", fontWeight: 700 }}>ECO-CHOICE</div>
        <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, marginTop: 24 }}>Every Action Leaves a Footprint.</div>
        <div style={{ fontSize: 32, marginTop: 28, color: "#F7F7EF" }}>Environmental Stewardship and the 17 SDGs</div>
      </div>
    ),
    size
  );
}
