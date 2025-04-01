import { useState, useCallback } from "react";

export const useFullscreenImage = () => {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const handleToggleFullscreen = useCallback((src: string) => {
    setFullscreenImage((prevImage) => (prevImage === src ? null : src));
  }, []);

  const closeFullscreen = useCallback(() => {
    setFullscreenImage(null);
  }, []);

  return {
    fullscreenImage,
    handleToggleFullscreen,
    closeFullscreen,
  };
};
