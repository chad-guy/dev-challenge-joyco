import Image from "next/image";
import { PreloadImageProps } from "./PreloadImage.types";

const PreloadImage = ({ src, index }: PreloadImageProps) => (
  <Image
    key={`preload-${index}`}
    src={src}
    width={800}
    height={800}
    alt={`Preload ${index}`}
    priority
  />
);

export default PreloadImage;
