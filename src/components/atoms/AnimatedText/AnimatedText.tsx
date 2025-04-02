import React from "react";
import { motion } from "framer-motion";
import { TextProps } from "../Text/Text.types";

const AnimatedText = ({
  children,
  color = "black",
  size = "md",
  variant = "sans",
  element = "p",
  className = "",
  weight = "400",
  opacity = 100,
  animation = "default",
  staggerChildren = 0.03,
  delayChildren = 0,
}: TextProps & {
  animation?: "default" | "bounce" | "wave" | "linear" | "fade";
  staggerChildren?: number;
  delayChildren?: number;
}) => {
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

  const text = children?.toString() || "";
  const characters = text.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  const animationVariants = {
    default: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 10,
        },
      },
    },
    bounce: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          damping: 10,
        },
      },
    },
    wave: {
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.05,
          type: "spring",
          damping: 8,
        },
      }),
    },
    linear: {
      hidden: { opacity: 0, y: 10 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.04,
          duration: 0.3,
          ease: "easeInOut",
          type: "tween",
        },
      }),
    },
    fade: {
      hidden: { opacity: 0 },
      visible: (i: number) => ({
        opacity: 1,
        transition: {
          delay: i * 0.03,
          duration: 0.2,
          ease: "linear",
          type: "tween",
        },
      }),
    },
  };

  return (
    <Element
      className={`${paragraphClass} uppercase ${className} inline-block overflow-hidden`}
    >
      <motion.span
        className="inline-block"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={animationVariants[animation]}
            custom={index}
            className="inline-block"
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </Element>
  );
};

export default AnimatedText;
