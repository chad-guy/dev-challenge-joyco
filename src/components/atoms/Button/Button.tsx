import React from "react";
import { ButtonProps } from "./Button.types";
import { useCursorStore } from "@/store/cursorStore";
import { motion } from "motion/react";

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  disabled = false,
  color = "black",
  onClick,
  className = "",
}) => {
  const { setDefault, setArrow } = useCursorStore();

  const variantsColor = {
    container:
      color === "black"
        ? "font-mono bg-black/80 py-4 rounded-lg px-16 border border-[#fafafa]/70 border-dashed backdrop-blur-lg text-white relative overflow-hidden hover:border-solid group"
        : "font-mono bg-base-light py-4 rounded-lg px-16 text-base-dark relative overflow-hidden hover:border-solid group",
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={setArrow}
      onMouseLeave={setDefault}
      initial={{ scale: 1, boxShadow: "0px 0px 0px rgba(250, 250, 250, 0)" }}
      whileHover={{
        scale: 1.04,
        boxShadow: "0px 0px 8px rgba(250, 250, 250, 0.3)",
        borderColor: "#fafafa",
      }}
      whileTap={{
        scale: 0.98,
        boxShadow: "0px 0px 0px rgba(250, 250, 250, 0)",
        rotate: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
        mass: 1.2,
      }}
      className={`${className} ${variantsColor.container} ${
        disabled && "opacity-55"
      }`}
    >
      <motion.span
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span className="relative z-10 flex items-center font-mono font-[700]">
        {children}
      </motion.span>
    </motion.button>
  );
};

export default Button;
