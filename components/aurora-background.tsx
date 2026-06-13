import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function AuroraBackground({ children, className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden bg-white ${className}`}>
      <div className="aurora-gradient animate-aurora pointer-events-none absolute -inset-[10px] opacity-50 [will-change:background-position]" />
      <div
        className="aurora-gradient animate-aurora pointer-events-none absolute -inset-[10px] opacity-30 [will-change:background-position]"
        style={{ animationDirection: "reverse", animationDuration: "40s" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
