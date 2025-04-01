"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CountryOption } from "@/lib/schemas/submission";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useCursorStore } from "@/store/cursorStore";

interface CustomCountryDropdownProps {
  options: CountryOption[];
  value: string;
  onChangeAction: (value: string) => void;
  error?: string;
}

const CustomCountryDropdown = ({
  options,
  value,
  onChangeAction,
  error,
}: CustomCountryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((option) => option.code === value);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
        setIsHovered(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  const handleOptionSelect = (optionCode: string) => {
    onChangeAction(optionCode);
    setIsOpen(false);
    setSearchTerm("");
    setIsHovered(false);
  };

  const { setDefault, setHovered } = useCursorStore();

  return (
    <div className="relative w-full flex" ref={dropdownRef}>
      <motion.div
        onMouseEnter={setHovered}
        onMouseLeave={setDefault}
        initial={{
          scale: 1,
          backgroundColor: "transparent",
          borderColor: error ? "#FF0000" : isOpen ? "#ffffff" : "#374151",
        }}
        animate={{
          borderColor: error ? "#FF0000" : isOpen ? "#ffffff" : "#374151",
        }}
        whileHover={{
          scale: 1.03,
          borderColor: error ? "#FF0000" : "#ffffff",
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{
          scale: {
            type: "spring",
            stiffness: 400,
            damping: 15,
            mass: 1.2,
          },
          default: {
            type: "tween",
            duration: 0.3,
            ease: "easeOut",
          },
        }}
        onClick={handleToggleDropdown}
        className="w-full rounded-md border overflow-hidden rounded-r-md focus:outline-none cursor-pointer flex items-center"
      >
        <div className="flex items-center justify-center p-3">
          <span
            className={`font-mono ${
              selectedOption?.code ? "text-white" : "text-gray-500"
            }`}
          >
            {selectedOption?.code?.toUpperCase() || "XXX"}
          </span>
        </div>
        <motion.div
          initial={{
            borderColor: error ? "#FF0000" : isOpen ? "#ffffff" : "#374151",
          }}
          animate={{
            borderColor: error
              ? "#FF0000"
              : isOpen || isHovered
              ? "#ffffff"
              : "#374151",
          }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: "easeOut",
          }}
          className="h-full border-[0.5px]"
        ></motion.div>
        <div className="flex justify-between gap-5 items-center grow p-3 overflow-hidden">
          <span
            className={`${value ? "text-white" : "text-gray-500"} truncate`}
            title={
              selectedOption
                ? selectedOption.label.toUpperCase()
                : "SELECT COUNTRY"
            }
          >
            {selectedOption
              ? selectedOption.label.toUpperCase()
              : "SELECT COUNTRY"}
          </span>
          <div className="">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.6665 5.24999L6.48424 3.43226C6.769 3.1475 7.23068 3.1475 7.51544 3.43226L9.33317 5.24999M4.6665 8.74999L6.48424 10.5677C6.769 10.8525 7.23068 10.8525 7.51544 10.5677L9.33317 8.74999"
                stroke="#FAFAFA"
                strokeWidth="1.16667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, transformOrigin: "top" }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 left-0 w-full bg-base-dark mt-1 top-full border border-white rounded-md shadow-lg max-h-60 overflow-hidden flex flex-col"
          >
            <div className="sticky top-0 p-2 bg-base-dark border-b border-white">
              <div className="relative flex items-center p-2 gap-4">
                <label htmlFor="">
                  <MagnifyingGlass
                    className="h-4 w-4 text-gray-500"
                    weight="bold"
                  />
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="SEARCH COUNTRY..."
                  className="w-full bg-transparent pr-4 focus:outline-none placeholder:text-gray-500 placeholder:font-mono text-white font-mono"
                />
              </div>
            </div>

            <div className="overflow-y-auto p-2 flex flex-col gap-2">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.code}
                    onClick={() => handleOptionSelect(option.code)}
                    className={`p-3 border border-transparent hover:border-white hover:text-white cursor-pointer transition-all duration-200 text-gray-500 rounded-xl flex items-center ${
                      value === option.code ? "bg-gray-700 text-white" : ""
                    }`}
                  >
                    <span className="font-mono mr-2 flex-shrink-0">
                      {option.code.toUpperCase()}
                    </span>
                    <span className="truncate w-full">
                      {option.label.toUpperCase()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-400 text-center">
                  NO RESULTS FOUND
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCountryDropdown;
