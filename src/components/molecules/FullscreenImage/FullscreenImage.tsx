import { CloseButton, ImageItem } from "@/components/atoms";
import { motion } from "framer-motion";
import { FullscreenImageProps } from "./FullscreenImage.types";

const FullscreenImage = ({ src, onClose }: FullscreenImageProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-base-dark bg-opacity-90 z-30 flex items-center justify-center p-5"
    onClick={onClose}
  >
    <motion.div
      layoutId={`image-${src}`}
      className="relative max-w-6xl max-h-screen z-40"
    >
      <ImageItem
        src={src}
        alt="Vista ampliada"
        width={1200}
        height={1200}
        priority={true}
        loading={undefined}
        className="object-contain max-h-[90vh] w-auto rounded-lg shadow-2xl"
      />
      <CloseButton onClose={onClose} />
    </motion.div>
  </motion.div>
);

export default FullscreenImage;
