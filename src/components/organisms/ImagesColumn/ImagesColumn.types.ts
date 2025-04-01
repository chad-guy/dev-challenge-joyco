export interface ImagesColumnProps {
  images: string[];
  hoveredImage: string | null;
  onImageHover: (src: string) => void;
  onImageHoverEnd: () => void;
  className?: string;
}
