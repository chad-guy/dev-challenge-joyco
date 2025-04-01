import { motion, useInView } from "framer-motion";
import { GalleryImageProps } from "./GalleryImage.types";
import { ImageItem } from "@/components/atoms";
import { useRef } from "react";
import { useCursorStore } from "@/store/cursorStore";

const GalleryImage = ({
  src,
  index,
  fileName,
  isHovered,
  shouldFade,
  onHover,
  onHoverEnd,
  onClick,
}: GalleryImageProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: false });

  const { setDefault, setArrow } = useCursorStore();

  const handleHoverStart = () => {
    setArrow();
    if (onHover) onHover();
  };

  const handleHoverEnd = () => {
    setDefault();
    if (onHoverEnd) onHoverEnd();
  };

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.03, y: -5 }}
      animate={{
        scale: isInView ? 1 : 0,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20,
        },
      }}
      initial={{ scale: 0 }}
      className="overflow-hidden w-full"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={onClick}
    >
      <motion.div
        animate={{ opacity: shouldFade ? 0.2 : 1 }}
        transition={{ duration: 0.2 }}
        className="w-full h-auto"
      >
        <motion.div layoutId={`image-${src}`} className="w-full h-auto">
          <ImageItem
            src={src}
            alt={fileName}
            priority={index < 3}
            loading={index < 3 ? undefined : "lazy"}
            className={`w-full h-auto transition-filter duration-300 ${
              isHovered ? "" : "grayscale"
            }`}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GalleryImage;
