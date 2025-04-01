import Image from "next/image";
import { ImageItemProps } from "./ImageItem.types";

const ImageItem = ({
  src,
  alt,
  width = 300,
  height = 300,
  priority = false,
  loading,
  className = "",
}: ImageItemProps) => {
  const loadingProp = priority ? undefined : loading || "lazy";

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      loading={loadingProp}
      className={className}
    />
  );
};

export default ImageItem;
