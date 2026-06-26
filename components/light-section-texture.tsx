export default function LightSectionTexture() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="200%"
        style={{ display: "block", opacity: 0.055 }}
      >
        <defs>
          <pattern
            id="dot-grid"
            x="0"
            y="0"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1.5" fill="#0d0d0d" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#dot-grid)"
          className="dot-grid-animate"
        />
      </svg>
    </div>
  );
}
