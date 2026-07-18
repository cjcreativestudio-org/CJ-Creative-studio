import { ImageResponse } from "next/og";

export const alt = "CJ Studio — premium websites for ambitious UK businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#8a8a8a",
          }}
        >
          <span>Web Design Studio</span>
          <span>UK</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 128,
              fontWeight: 800,
              letterSpacing: -4,
              color: "#f0f0f0",
              lineHeight: 1,
            }}
          >
            CJ Studio
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#9a9aa4", marginTop: 24 }}>
            Premium websites for ambitious UK businesses.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: 8,
            width: "100%",
            backgroundImage: "linear-gradient(to right, #8a6cff, #4d7cff, #27d7c4)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
