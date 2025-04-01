import React from "react";
import { TextProps } from "./Text.types";

const Text = ({
  children,
  color = "black",
  size = "md",
  variant = "sans",
  element = "p",
  className = "",
  weight = "400",
  opacity = 100,
}: TextProps) => {
  const colorClasses = {
    white: "text-base-light",
    black: "text-base-dark",
  };

  const opacityClasses = {
    10: "opacity-10",
    20: "opacity-20",
    30: "opacity-30",
    40: "opacity-40",
    50: "opacity-50",
    60: "opacity-60",
    70: "opacity-70",
    80: "opacity-80",
    90: "opacity-90",
    100: "opacity-100",
  };

  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const variantClasses = {
    mono: "font-mono",
    sans: "font-sans",
  };

  const weightClasses = {
    400: "font-[400]",
    500: "font-[500]",
    600: "font-[600]",
    700: "font-[700]",
  };

  const Element = element;

  const paragraphClass = `${colorClasses[color]} ${sizeClasses[size]} ${variantClasses[variant]} ${weightClasses[weight]} ${opacityClasses[opacity]}`;

  return (
    <Element className={`${paragraphClass} uppercase ${className}`}>
      {children}
    </Element>
  );
};

export default Text;
