export interface TextProps {
  children: React.ReactNode;
  color?: "white" | "black";
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "mono" | "sans";
  element?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  weight?: "400" | "500" | "600" | "700";
  opacity?: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
}
