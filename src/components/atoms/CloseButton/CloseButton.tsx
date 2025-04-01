import { motion } from "framer-motion";
import { X } from "@phosphor-icons/react";
import { CloseButtonProps } from "./CloseButton.types";
import { useCursorStore } from "@/store/cursorStore";

const CloseButton = ({ onClose }: CloseButtonProps) => {
  const { setCross, setDefault } = useCursorStore();

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.2 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={setCross}
      onMouseLeave={setDefault}
      className="absolute z-50 top-4 right-4 bg-base-dark text-white p-2 rounded-full hover:bg-opacity-70 transition-all cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        onClose(e);
      }}
    >
      <X size={32} className="text-base-light" width={"bold"} />
    </motion.button>
  );
};

export default CloseButton;
