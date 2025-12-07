import type { ReactNode } from "react";
import "../../styles/ui/Subtitle.css";

interface SubtitleProps {
  children: ReactNode;
  as?: "h2" | "h3" | "h4";
  className?: string;
}

export default function Subtitle({
  children,
  as = "h2",
  className = "",
}: SubtitleProps) {
  const Tag = as;
  return (
    <Tag className={`subtitle ${Tag} ${className}`.trim()}>{children}</Tag>
  );
}
