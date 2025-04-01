import { useMemo } from "react";

export const useFileNames = (images: string[]) => {
  return useMemo(() => {
    return images.map((src) => src.split("/").pop()?.split(".")[0] || "");
  }, [images]);
};
