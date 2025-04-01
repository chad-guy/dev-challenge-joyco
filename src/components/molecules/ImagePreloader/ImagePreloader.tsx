import { PreloadImage } from "@/components/atoms";
import { ImagePreloaderProps } from "./ImagePreloader.types";

const ImagePreloader = ({ srcs, maxImages = 3 }: ImagePreloaderProps) => {
  return (
    <div style={{ display: "none" }}>
      {srcs.slice(0, maxImages).map((src, index) => (
        <PreloadImage key={`preload-${index}`} src={src} index={index} />
      ))}
    </div>
  );
};

export default ImagePreloader;
