import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCursorStore } from "@/store/cursorStore";
import { ArrowLeft, X } from "@phosphor-icons/react";

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { cursorType } = useCursorStore();

  useEffect(() => {
    const mouseMove = (e: MouseEvent): void => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor fixed left-0 top-0 z-50 pointer-events-none rounded-full h-8 w-8 bg-base-dark border-2 border-white opacity-50 flex items-center justify-center"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: cursorType !== "default" ? 1.5 : 1,
        transition: {
          type: "spring",
          mass: 0.6,
        },
      }}
    >
      <AnimatePresence mode="wait">
        {cursorType === "arrow" ? (
          <motion.div
            key="arrow"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft
              className="text-lg text-white rotate-45"
              weight={"bold"}
            />
          </motion.div>
        ) : cursorType === "cross" ? (
          <motion.div
            key="cross"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="text-lg text-white" weight={"bold"} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomCursor;
