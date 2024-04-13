export default function GlassBtn({
  children,
  onClick,
  color,
  position,
  transform,
  width,
  padding,
  radius,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
  position?: "absolute" | "relative" | "fixed";
  transform?: string;
  width?: string;
  padding?: string;
  radius?: string;
}) {
  return (
    <button
      className="buttonglass flex items-center justify-center gap-1 rounded-xl border-0 p-2"
      onClick={onClick}
      style={{
        color: color ?? "white",
        position: position ?? "relative",
        transform: transform ?? "none",
        width: `${width}rem` ?? `auto`,
        padding: `${padding}rem` ?? "0.5rem",
        borderRadius: `${radius}rem` ?? "0.75rem",
      }}
    >
      {children}
    </button>
  );
}
