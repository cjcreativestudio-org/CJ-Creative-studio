"use client";

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  wordmarkColor?: "dark" | "white";
  className?: string;
}

export default function Logo({ size = 28, showWordmark = true, wordmarkColor = "dark", className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="100" y2="87" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#f472b6" />
            <stop offset="33%"  stopColor="#a78bfa" />
            <stop offset="66%"  stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <polygon points="50,4 96,87 4,87" fill="url(#logoGrad)" />
        <polygon points="50,32 72,72 28,72" fill="white" />
        <line x1="50" y1="87" x2="26" y2="100" stroke="#fda4af" strokeWidth="3.5" strokeLinecap="round" opacity="0.75" />
        <line x1="50" y1="87" x2="38" y2="100" stroke="#c4b5fd" strokeWidth="3.5" strokeLinecap="round" opacity="0.75" />
        <line x1="50" y1="87" x2="50" y2="100" stroke="#93c5fd" strokeWidth="3.5" strokeLinecap="round" opacity="0.75" />
        <line x1="50" y1="87" x2="62" y2="100" stroke="#6ee7b7" strokeWidth="3.5" strokeLinecap="round" opacity="0.75" />
        <line x1="50" y1="87" x2="74" y2="100" stroke="#86efac" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      </svg>

      {showWordmark && (
        <span
          className={`text-[15px] font-semibold tracking-tight ${
            wordmarkColor === "white" ? "text-white" : "text-gray-900"
          }`}
        >
          CJ Studio
        </span>
      )}
    </div>
  );
}
