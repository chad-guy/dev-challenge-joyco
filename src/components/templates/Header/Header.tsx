"use client";
import { Button, Text } from "@/components/atoms";
import { Plus } from "@phosphor-icons/react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { JoycoReferenceForm } from "../JoycoReferenceForm";
import { useLenis } from "lenis/react";

const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const lenis = useLenis();

  const handleOpenModal = () => {
    setIsOpenModal(true);
    lenis?.stop();
  };

  const handleCloseModalAction = () => {
    setIsOpenModal(false);
    lenis?.start();
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
        }}
        className="fixed bottom-0 lg:bottom-auto lg:top-0 left-0 z-20 w-full"
      >
        <div className="relative flex justify-end p-5">
          <div className="h-full w-full flex justify-between gap-20 items-center">
            <div className="grow hidden lg:block"></div>
            <Text
              variant="mono"
              color="white"
              size="md"
              weight="500"
              className="mix-blend-difference relative z-30 hidden lg:block"
            >
              DEV CHALLENGE 2025
            </Text>
            <div className="flex items-center gap-10 grow lg:grow-0">
              <Text
                variant="mono"
                color="white"
                size="md"
                weight="500"
                className="mix-blend-difference relative z-30 hidden lg:block"
              >
                [ ALEJO PEQUEÑO ]
              </Text>
              <div
                className={`relative grow lg:grow-0 ${
                  isOpenModal ? "opacity-0" : "opacity-100"
                }`}
              >
                <Button
                  className="text-white flex justify-center items-center w-full lg:w-auto"
                  onClick={handleOpenModal}
                >
                  <Plus size={12} className="mr-6" weight="bold" />
                  SUBMIT YOURS
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {isOpenModal && (
          <JoycoReferenceForm handleCloseModalAction={handleCloseModalAction} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
