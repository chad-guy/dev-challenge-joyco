"use client";
import { Button, Text } from "@/components/atoms";
import { Plus } from "@phosphor-icons/react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { JoycoReferenceForm } from "../JoycoReferenceForm";
import { useIsTablet } from "@/hooks/useIsTablet";
import { useLenis } from "lenis/react";

const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const lenis = useLenis();

  const handleOpenModal = () => {
    setIsOpenModal(true);
    lenis?.stop();
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    lenis?.start();
  };

  const isTablet = useIsTablet();

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
              <div className="relative grow lg:grow-0">
                <Button
                  className={`text-white flex justify-center items-center w-full lg:w-auto opacity-100 transition-all duration-200 ${
                    isOpenModal && "opacity-0"
                  }`}
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
          <>
            <div
              className="fixed left-0 top-0 w-full h-screen z-40"
              onClick={handleCloseModal}
            />
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                backdropFilter: "blur(0px)",
                WebkitBackdropFilter: "blur(0px)",
                transformOrigin: isTablet ? "bottom bottom" : "top right",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                transition: {
                  type: "tween",
                  duration: 0.2,
                  ease: "easeOut",
                  backdropFilter: "blur(0px)",
                  WebkitBackdropFilter: "blur(0px)",
                },
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                mass: 1.2,
              }}
              className="fixed border rounded-2xl border-[#fafafa]/70 border-dashed bg-base-dark-opacity bottom-0 left-0 w-full lg:w-auto lg:bottom-auto lg:left-auto lg:right-5 lg:top-5 z-50"
            >
              <JoycoReferenceForm />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
