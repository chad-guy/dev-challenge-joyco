"use client";
import { CustomCursor } from "@/components/atoms";
import { ImagesColumn } from "@/components/organisms";
import { useState } from "react";
import { ReactLenis } from "lenis/react";
import { InfiniteSlider } from "@/components/molecules";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useInPlaces } from "@/hooks/useInPlaces";
import { useGroupedImages } from "@/hooks/useGroupedImages";
import { Footer } from "@/components/templates";
import { AnimatedText } from "@/components/atoms/AnimatedText";

export default function HomePage() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { data, loading, error } = useInPlaces();
  const imagesInPlaces = data?.collections.inPlaces.items;
  async function fetchProfiles() {
    try {
      const response = await fetch("/api/profile");

      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los perfiles:", error);
      throw error;
    }
  }
  console.log("FetchProfiles", fetchProfiles);

  const imageGroups = useGroupedImages(imagesInPlaces, isMobile);

  const handleImageHover = (imageSrc: string) => {
    setHoveredImage(imageSrc);
  };

  const handleImageHoverEnd = () => {
    setHoveredImage(null);
  };

  return (
    <ReactLenis root options={{ smoothWheel: true, lerp: 0.1 }}>
      <main>
        <CustomCursor />
        <div className="min-h-screen relative lg:flex lg:gap-5">
          {/* HERO */}
          <div className="sticky z-10 top-0 pb-6 w-full bg-gradient-dark-to-transparent p-5 lg:w-1/2">
            <div className="w-fit lg:w-full flex justify-start lg:p-5">
              <div className="w-fit lg:fixed lg:flex lg:flex-col">
                <AnimatedText
                  animation="default"
                  staggerChildren={0.01}
                  delayChildren={0.2}
                  color="white"
                  element="p"
                  size="xs"
                  weight="500"
                  variant="mono"
                  className="ml-10 md:!text-sm lg:!text-base"
                >
                  ALL AROUND THE WORLD
                </AnimatedText>
                <AnimatedText
                  animation="default"
                  staggerChildren={0.02}
                  delayChildren={0.2}
                  color="white"
                  size="lg"
                  weight="700"
                  className=" text-[29.5vw] lg:text-[10vw] leading-[0.8] tracking-tight text-end"
                >
                  JOYCO IN
                </AnimatedText>
                <AnimatedText
                  animation="default"
                  staggerChildren={0.02}
                  delayChildren={0.2}
                  color="white"
                  size="lg"
                  weight="700"
                  className=" text-[29.5vw] lg:text-[10vw] leading-[0.8] tracking-tight text-end"
                >
                  PLACES
                </AnimatedText>
                <AnimatedText
                  animation="default"
                  staggerChildren={0.01}
                  delayChildren={0.2}
                  color="white"
                  opacity={50}
                  element="p"
                  size="xs"
                  weight="500"
                  variant="mono"
                  className="text-end mt-2 md:!text-sm lg:!text-base"
                >
                  REBELS, EVERYWHERE
                </AnimatedText>
              </div>
            </div>
          </div>
          {/* PHOTOS */}
          {!loading && !error && (
            <div className="flex gap-5 h-auto p-5 pt-0 lg:pt-5 lg:w-1/2 relative">
              <ImagesColumn
                images={imageGroups[0] || []}
                hoveredImage={hoveredImage}
                onImageHover={handleImageHover}
                onImageHoverEnd={handleImageHoverEnd}
                className="grow"
              />
              <ImagesColumn
                images={imageGroups[1] || []}
                hoveredImage={hoveredImage}
                onImageHover={handleImageHover}
                onImageHoverEnd={handleImageHoverEnd}
                className="grow"
              />
              <ImagesColumn
                images={imageGroups[2] || []}
                hoveredImage={hoveredImage}
                onImageHover={handleImageHover}
                onImageHoverEnd={handleImageHoverEnd}
                className="hidden md:block md:grow"
              />
            </div>
          )}
        </div>
        {/* FUCKING COOL WARNING */}
        <InfiniteSlider />
      </main>
      <Footer />
    </ReactLenis>
  );
}
