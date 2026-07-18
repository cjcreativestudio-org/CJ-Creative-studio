"use client";

import { useState } from "react";

// Small clipboard button for the private /leads page. Receives a plain string
// prop (composed by the server page) — imports no data/server modules, so it
// stays out of any fs/server-only bundle path.
export default function CopyButton({
  text,
  label = "Copy email",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy cold email to clipboard"
      className="shrink-0 text-[10px] tracking-[0.18em] uppercase text-[#5b9fd6] transition-opacity duration-[160ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70"
      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
    >
      {copied ? "Copied ✓" : label}
    </button>
  );
}
