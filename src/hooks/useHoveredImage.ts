import { useState, useCallback } from "react";

export const useHoveredImage = () => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const handleImageHover = useCallback((src: string) => {
    setHoveredImage(src);
  }, []);

  const handleImageHoverEnd = useCallback(() => {
    setHoveredImage(null);
  }, []);

  return {
    hoveredImage,
    handleImageHover,
    handleImageHoverEnd,
  };
};
