export interface ImageItemProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  loading?: "eager" | "lazy";
}
