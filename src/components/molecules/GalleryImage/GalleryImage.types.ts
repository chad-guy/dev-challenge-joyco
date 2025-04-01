export interface GalleryImageProps {
  src: string;
  index: number;
  fileName: string;
  isHovered: boolean;
  shouldFade: boolean;
  onHover: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}
