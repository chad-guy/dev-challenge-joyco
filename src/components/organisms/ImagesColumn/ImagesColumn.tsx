import {
  FullscreenImage,
  GalleryImage,
  ImagePreloader,
} from "@/components/molecules";
import { AnimatePresence } from "framer-motion";
import { ImagesColumnProps } from "./ImagesColumn.types";
import { useFullscreenImage } from "@/hooks/useFullscreenImage";
import { useFileNames } from "@/hooks/useFileNames";

const ImagesColumn = ({
  images,
  hoveredImage,
  onImageHover,
  onImageHoverEnd,
  className = "",
}: ImagesColumnProps) => {
  const fileNames = useFileNames(images);
  const { fullscreenImage, handleToggleFullscreen, closeFullscreen } =
    useFullscreenImage();

  return (
    <div className={className}>
      <ImagePreloader srcs={images} maxImages={3} />

      <div className="flex flex-col gap-5">
        {images.map((src, index) => {
          const isHovered = hoveredImage === src;
          const shouldFade = hoveredImage !== null && !isHovered;

          return (
            <GalleryImage
              key={src}
              src={src}
              index={index}
              fileName={fileNames[index]}
              isHovered={isHovered}
              shouldFade={shouldFade}
              onHover={() => onImageHover(src)}
              onHoverEnd={onImageHoverEnd}
              onClick={() => handleToggleFullscreen(src)}
            />
          );
        })}
      </div>

      <AnimatePresence>
        {fullscreenImage && (
          <FullscreenImage src={fullscreenImage} onClose={closeFullscreen} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImagesColumn;
