import "../../styles/ui/Paragraph.css";
import type { ReactNode } from "react";

interface ParagraphProps {
  children: ReactNode;
  className?: string;
}

export default function Paragraph({
  children,
  className = "",
}: ParagraphProps) {
  return <p className={`paragraph ${className}`.trim()}>{children}</p>;
}
