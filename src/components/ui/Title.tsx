import "../../styles/ui/Title.css";
import type { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export default function Title({
  children,
  as = "h1",
  className = "",
}: TitleProps) {
  const Tag = as;

  return <Tag className={`title ${Tag} ${className}`.trim()}>{children}</Tag>;
}
