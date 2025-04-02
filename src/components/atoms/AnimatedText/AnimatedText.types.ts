import { TextProps } from "../Text/Text.types";

export interface AnimatedTextProps extends TextProps {
  animationDelay?: number;
  animationDuration?: number;
  staggerAmount?: number;
  animationType?: "chars" | "words" | "chars,words" | "lines";
  ease?: string;
  yOffset?: number;
  animateByWord?: boolean;
}
