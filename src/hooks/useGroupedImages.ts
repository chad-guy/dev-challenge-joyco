import { useEffect, useState } from "react";

export interface BasehubImage {
  _id: string;
  _sys: {
    title: string;
    slug: string;
  };
  image: {
    url: string;
    width: number;
    height: number;
    alt: string;
    fileName: string;
  };
  uploadedBy: {
    _id: string;
    _sys: {
      title: string;
    };
    email: string;
    country: string;
  };
}

export const useGroupedImages = (
  items: BasehubImage[] | undefined,
  isMobile: boolean
): string[][] => {
  const [groupedImages, setGroupedImages] = useState<string[][]>([]);

  useEffect(() => {
    if (!items || items.length === 0) {
      setGroupedImages([]);
      return;
    }

    const imageUrls = items.map((item) => item.image.url);

    const numGroups = isMobile ? 2 : 3;

    const totalImages = imageUrls.length;
    const baseItemsPerGroup = Math.floor(totalImages / numGroups);

    const remainder = totalImages % numGroups;

    const groups: string[][] = [];
    let currentIndex = 0;

    for (let i = 0; i < numGroups; i++) {
      const itemsInThisGroup =
        i < remainder ? baseItemsPerGroup + 1 : baseItemsPerGroup;

      if (itemsInThisGroup > 0) {
        const endIndex = currentIndex + itemsInThisGroup;
        groups.push(imageUrls.slice(currentIndex, endIndex));
        currentIndex = endIndex;
      }
    }

    setGroupedImages(groups);
  }, [items, isMobile]);

  return groupedImages;
};
