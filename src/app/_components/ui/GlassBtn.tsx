import React from "react";

export default function GlassBtn({
  children,
  onClick,
  color,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
}) {
  return (
    <button
      className="buttonglass flex items-center justify-center gap-1 rounded-xl border-0 p-2"
      onClick={onClick}
      style={{
        color: color ?? "white",
      }}
    >
      {children}
    </button>
  );
}
