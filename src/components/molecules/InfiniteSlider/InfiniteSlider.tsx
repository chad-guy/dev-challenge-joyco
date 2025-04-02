import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useCursorStore } from "@/store/cursorStore";
import { motion } from "motion/react";

type TweenRefType = gsap.core.Tween | null;

const InfiniteSlider = () => {
  const tweenRef = useRef<TweenRefType>(null);
  const marqueeInnerRef = useRef<HTMLDivElement | null>(null);
  const marqueePartsRef = useRef<HTMLDivElement[]>([]);
  const exclamationMarksRef = useRef<HTMLSpanElement[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const { setDefault, setHovered } = useCursorStore();

  useEffect(() => {
    let currentScroll = 0;
    let isScrollingDown = true;
    if (!marqueeInnerRef.current || marqueePartsRef.current.length === 0)
      return;
    gsap.set(marqueeInnerRef.current, { xPercent: -50 });
    const tween = gsap
      .to(marqueePartsRef.current, {
        xPercent: -100,
        repeat: -1,
        duration: 10,
        ease: "linear",
      })
      .totalProgress(0.5);
    tweenRef.current = tween;

    const handleScroll = () => {
      if (window.pageYOffset > currentScroll) {
        isScrollingDown = true;
      } else {
        isScrollingDown = false;
      }
      if (tweenRef.current) {
        gsap.to(tweenRef.current, {
          timeScale: isScrollingDown ? 1 : -1,
        });
      }
      exclamationMarksRef.current.forEach((mark) => {
        if (isScrollingDown) {
          mark.classList.remove("active");
        } else {
          mark.classList.add("active");
        }
      });
      currentScroll = window.pageYOffset;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!tweenRef.current) return;

    if (isHovering) {
      tweenRef.current.pause();
    } else {
      tweenRef.current.play();
    }
  }, [isHovering]);

  const addMarqueePartRef = (el: HTMLDivElement | null) => {
    if (el && !marqueePartsRef.current.includes(el)) {
      marqueePartsRef.current.push(el);
    }
  };

  const addExclamationMarkRef = (el: HTMLSpanElement | null) => {
    if (el && !exclamationMarksRef.current.includes(el)) {
      exclamationMarksRef.current.push(el);
    }
  };

  const onMouseEnterSlider = () => {
    setIsHovering(true);
    setHovered();
  };

  const onMouseLeaveSlider = () => {
    setIsHovering(false);
    setDefault();
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
      }}
      className="fixed -left-[20vw] -bottom-[10vw] w-[300vw] rotate-[22deg] flex items-center gap-5 sm:-bottom-[20vw] md:-bottom-[30vh] lg:z-20 lg:-bottom-[35vw] cursor-default overflow-visible"
      onMouseEnter={onMouseEnterSlider}
      onMouseLeave={onMouseLeaveSlider}
    >
      <div
        className={`absolute z-10 left-[25vw] bottom-0 flex flex-col items-center transition-all duration-300 ease-out ${
          isHovering ? "-translate-y-5 scale-100" : "translate-y-1/2 scale-0"
        }`}
        style={{ zIndex: isHovering ? 30 : -20 }}
      >
        <div className="relative mb-10">
          <div className="relative flex flex-col justify-center items-center">
            <p className="font-bold text-xl text-center text-base-dark bg-base-light px-4 py-1 rounded-md">
              HIRE ME! I&apos;M FUCKING COOL 🙃
            </p>
          </div>
        </div>
      </div>

      <div
        ref={marqueeInnerRef}
        className="flex w-fit flex-auto flex-row bg-fucking-cool-yellow p-2 relative z-20"
      >
        {[...Array(8)].map((_, index) => (
          <div
            ref={addMarqueePartRef}
            key={index}
            className="flex items-center gap-5 flex-shrink-0 px-1"
          >
            <div className="flex items-center gap-5 font-mono font-medium text-lg md:text-xl lg:text-2xl text-black">
              <span
                ref={addExclamationMarkRef}
                className="exclamation-mark inline-block transform"
              >
                [!]
              </span>
              <span>FUCKING COOL WARNING</span>
            </div>
            <div className="flex items-center gap-5 font-mono font-medium text-lg md:text-xl lg:text-2xl text-black">
              <span
                ref={addExclamationMarkRef}
                className="exclamation-mark inline-block transform"
              >
                (!)
              </span>
              <span>FUCKING COOL WARNING</span>
            </div>
            <div className="flex items-center gap-5 font-mono font-medium text-lg md:text-xl lg:text-2xl text-black">
              <span
                ref={addExclamationMarkRef}
                className="exclamation-mark inline-block transform"
              >
                [!]
              </span>
              <span>FUCKING COOL WARNING</span>
            </div>
            <div className="flex items-center gap-5 font-mono font-medium text-lg md:text-xl lg:text-2xl text-black">
              <span
                ref={addExclamationMarkRef}
                className="exclamation-mark inline-block transform"
              >
                (!)
              </span>
              <span>FUCKING COOL WARNING</span>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default InfiniteSlider;
