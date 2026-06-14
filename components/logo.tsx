import Image from "next/image";

interface LogoProps {
  variant?: "mark" | "horizontal" | "stacked" | "full";
  height?: number;
  className?: string;
  priority?: boolean;
  /** Pass true when rendering on a dark background — text switches to white */
  onDark?: boolean;
}

const BLUE_DOT = "#4d7cff";

export default function Logo({
  variant = "horizontal",
  height = 32,
  className = "",
  priority = false,
  onDark = false,
}: LogoProps) {
  const textColor = onDark ? "#ffffff" : "#0c0e14";
  const markSize = variant === "stacked" ? height * 0.7 : height;

  if (variant === "mark") {
    return (
      <Image
        src="/cj-mark.svg"
        alt="CJ Studio"
        height={height}
        width={height}
        style={{ height, width: "auto" }}
        priority={priority}
        className={className}
      />
    );
  }

  if (variant === "stacked") {
    return (
      <div
        className={`flex flex-col items-center gap-2 ${className}`}
        style={{ width: "fit-content" }}
      >
        <Image
          src="/cj-mark.svg"
          alt=""
          aria-hidden
          height={markSize}
          width={markSize}
          style={{ height: markSize, width: "auto" }}
          priority={priority}
        />
        <span
          style={{
            fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
            fontSize: height * 0.38,
            fontWeight: 800,
            color: textColor,
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
            lineHeight: 1,
            transition: "color 0.3s",
          }}
        >
          CJ Creative Studio
          <span style={{ color: BLUE_DOT }}>.</span>
        </span>
      </div>
    );
  }

  // "horizontal" and "full" — mark left, wordmark right
  return (
    <div
      className={`flex items-center gap-2.5 ${className}`}
      style={{ height, flexShrink: 0 }}
    >
      <Image
        src="/cj-mark.svg"
        alt=""
        aria-hidden
        height={markSize}
        width={markSize}
        style={{ height: markSize, width: "auto" }}
        priority={priority}
      />
      <span
        style={{
          fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
          fontSize: height * 0.58,
          fontWeight: 800,
          color: textColor,
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap",
          lineHeight: 1,
          transition: "color 0.3s",
        }}
      >
        CJ Creative Studio
        <span style={{ color: BLUE_DOT }}>.</span>
      </span>
    </div>
  );
}
