import Image from "next/image";

interface LogoProps {
  /** "mark" for nav (SVG icon), "horizontal" for footer, "stacked" for other uses, "full" for nav full-width logo */
  variant?: "mark" | "horizontal" | "stacked" | "full";
  /** Height in pixels — width auto-scales to preserve aspect ratio */
  height?: number;
  className?: string;
}

const srcs: Record<NonNullable<LogoProps["variant"]>, string> = {
  mark: "/cj-mark.svg",
  horizontal: "/assets/cj-logo-horizontal.png",
  stacked: "/assets/cj-logo-stacked.png",
  full: "/assets/cj-logo-full.png",
};

const aspectRatios: Record<NonNullable<LogoProps["variant"]>, number> = {
  mark: 1,
  horizontal: 5,
  stacked: 2,
  full: 2.1,
};

export default function Logo({
  variant = "horizontal",
  height = 32,
  className = "",
}: LogoProps) {
  return (
    <Image
      src={srcs[variant]}
      alt="CJ Creative Studio"
      height={height}
      width={height * aspectRatios[variant]}
      className={`h-auto ${className}`}
      style={{ height, width: "auto" }}
      priority
    />
  );
}
