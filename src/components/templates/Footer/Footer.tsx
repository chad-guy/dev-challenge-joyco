"use client";
import { Text } from "@/components/atoms";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full">
      <div className="relative flex justify-end p-5">
        <div className="h-full w-full flex justify-between gap-40 items-center">
          <div className="grow"></div>
          <Text
            variant="mono"
            color="white"
            size="md"
            weight="500"
            className="mix-blend-difference relative z-30 hidden lg:block"
          >
            MADE BY REBELS
          </Text>
          <Text
            variant="mono"
            color="white"
            size="md"
            weight="500"
            className="mix-blend-difference relative z-30 hidden lg:block"
          >
            FOR REBELS
          </Text>
          <Text
            variant="mono"
            color="white"
            size="md"
            weight="500"
            className="mix-blend-difference relative z-30 pr-20 hidden lg:block"
          >
            2025
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
