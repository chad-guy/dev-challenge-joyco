"use client";
import { useState, useRef, ChangeEvent } from "react";
import { useForm } from "react-hook-form";

import {
  getCountryOptions,
  VALID_IMAGE_TYPES,
  MAX_FILE_SIZE,
  MAX_ATTACHMENTS,
  CountryOption,
  submissionSchema,
  SubmissionSchema,
} from "@/lib/schemas/submission";
import { Button, CustomCountryDropdown, Text } from "@/components/atoms";
import { AnimatePresence, motion } from "motion/react";
import { useCursorStore } from "@/store/cursorStore";
import { Plus, X, CheckCircle } from "@phosphor-icons/react";

type FormInputs = Omit<SubmissionSchema, "attachments">;

export default function JoycoReferenceForm() {
  const countryOptions: CountryOption[] = getCountryOptions();

  const [attachments, setAttachments] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string>("");
  const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
    setValue,
  } = useForm<FormInputs>({
    defaultValues: {
      uploadedBy: "",
      country: "",
      email: "",
    },
  });

  const selectedCountry = watch("country");

  const validateForm = (data: FormInputs): boolean => {
    let isValid = true;

    try {
      const uploadedByResult = submissionSchema.shape.uploadedBy.safeParse(
        data.uploadedBy
      );
      if (!uploadedByResult.success) {
        setError("uploadedBy", {
          type: "manual",
          message: uploadedByResult.error.errors[0].message,
        });
        isValid = false;
      } else {
        clearErrors("uploadedBy");
      }

      const countryResult = submissionSchema.shape.country.safeParse(
        data.country
      );
      if (!countryResult.success) {
        setError("country", {
          type: "manual",
          message: countryResult.error.errors[0].message,
        });
        isValid = false;
      } else {
        clearErrors("country");
      }

      const emailResult = submissionSchema.shape.email.safeParse(data.email);
      if (!emailResult.success) {
        setError("email", {
          type: "manual",
          message: emailResult.error.errors[0].message,
        });
        isValid = false;
      } else {
        clearErrors("email");
      }
    } catch (error) {
      console.error("Error in validation:", error);
      isValid = false;
    }

    return isValid;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    setFileError("");

    if (attachments.length + files.length > MAX_ATTACHMENTS) {
      setFileError(`Maximum of ${MAX_ATTACHMENTS} files allowed`);
      return;
    }

    const validFiles = files.filter((file) => {
      if (
        !VALID_IMAGE_TYPES.includes(
          file.type as (typeof VALID_IMAGE_TYPES)[number]
        )
      ) {
        setFileError(
          "Invalid file type. Only JPEG, PNG, GIF, WebP and SVG files are allowed"
        );
        return false;
      }

      if (file.size > MAX_FILE_SIZE) {
        setFileError("File size must be less than 5MB");
        return false;
      }

      return true;
    });

    setAttachments((prev) => [...prev, ...validFiles]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => {
      const newAttachments = prev.filter((_, i) => i !== index);

      if (fileError) setFileError("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return newAttachments;
    });
  };

  const onSubmit = async (data: FormInputs) => {
    if (!validateForm(data)) {
      return;
    }

    if (attachments.length === 0) {
      setFileError("At least one file attachment is required");
      return;
    }

    setIsSubmitSuccess(false);

    const formDataToSend = new FormData();
    formDataToSend.append("uploadedBy", data.uploadedBy);
    formDataToSend.append("country", data.country);
    formDataToSend.append("email", data.email);

    attachments.forEach((file) => {
      formDataToSend.append("attachments", file);
    });

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setIsSubmitSuccess(true);

      reset();
      setAttachments([]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setTimeout(() => {
        setIsSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("email", {
        type: "manual",
        message: "Submission failed. Please try again.",
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange({
        target: { files: e.dataTransfer.files },
      } as ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleAddFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleCountryChange = (value: string) => {
    setValue("country", value, { shouldValidate: true });
  };

  const { setDefault, setHovered } = useCursorStore();

  return (
    <div className="lg:max-w-3xl p-8">
      <Text
        color="white"
        variant="mono"
        weight="700"
        className="!text-lg md:!text-2xl lg:!text-3xl"
      >
        SUBMIT YOUR JOYCO REFERENCE
      </Text>

      <AnimatePresence>
        {isSubmitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute gap-4 top-0 left-1/2 transform -translate-x-1/2 bg-green-500/90 border border-green-500 p-4 rounded-md mt-4 flex items-center z-50"
          >
            <CheckCircle size={30} className="text-white" weight="fill" />
            <Text color="white" variant="mono" weight="600">
              SUCCESSFUL SUBMISSION! WE WILL VALIDATE YOUR REFERENCE IN 1-2
              DAYS.
            </Text>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <Text color="white" variant="mono">
              <label className="block uppercase text-sm font-medium opacity-80">
                UPLOADED BY
              </label>
            </Text>

            <motion.input
              animate={{
                scale: 1,
                borderColor: errors.uploadedBy ? "#FF0000" : "#374151",
              }}
              onMouseEnter={setHovered}
              onMouseLeave={setDefault}
              whileHover={{
                scale: 1.03,
                borderColor: errors.uploadedBy ? "#FF0000" : "#ffffff",
              }}
              whileFocus={{
                borderColor: errors.uploadedBy ? "#FF0000" : "#ffffff",
              }}
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
              {...register("uploadedBy")}
              type="text"
              className="w-full p-3 border rounded-md focus:outline-none placeholder:text-gray-500 placeholder:font-mono text-white font-mono"
              placeholder="YOUR NAME"
            />
            <AnimatePresence>
              {errors.uploadedBy && (
                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="text-red-500 mb-4 text-xs"
                >
                  *{errors.uploadedBy.message || "REQUIRED"}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <Text color="white" variant="mono">
              <label className="block uppercase text-sm font-medium opacity-80">
                COUNTRY
              </label>
            </Text>
            <CustomCountryDropdown
              options={countryOptions}
              value={selectedCountry}
              onChangeAction={handleCountryChange}
              error={errors.country?.message}
            />
            <input type="hidden" {...register("country")} />
            <AnimatePresence>
              {errors.country && (
                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="text-red-500 mb-4 text-xs"
                >
                  *{errors.country.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Text color="white" variant="mono">
            <label className="block uppercase text-sm font-medium opacity-80">
              EMAIL
            </label>
          </Text>
          <motion.input
            animate={{
              scale: 1,
              borderColor: errors.email ? "#FF0000" : "#374151",
            }}
            onMouseEnter={setHovered}
            onMouseLeave={setDefault}
            whileHover={{
              scale: 1.02,
              borderColor: errors.email ? "#FF0000" : "#ffffff",
            }}
            whileFocus={{
              borderColor: errors.email ? "#FF0000" : "#ffffff",
            }}
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
            {...register("email")}
            type="text"
            className="w-full p-3 border rounded-md focus:outline-none placeholder:text-gray-500 placeholder:font-mono text-white font-mono"
            placeholder="YOUR EMAIL"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="text-red-500 mb-4 text-xs"
              >
                *{errors.email.message || "INVALID EMAIL"}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <div className="flex gap-2 md:gap-5 items-center justify-between">
              <div className="grow h-[1px] border-t border-dashed border-white/20"></div>
              <Text
                variant="mono"
                color="white"
                className="text-base lg:text-lg py-4 !text-gray-300"
              >
                UPLOAD THAT JOYCO SMILE
              </Text>
              <div className="grow h-[1px] border-t border-dashed border-white/20"></div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept={VALID_IMAGE_TYPES.join(",")}
              className="hidden"
            />

            {attachments.length > 0 ? (
              <motion.div
                initial={{
                  borderColor: "#4B5563",
                  borderStyle: "dashed",
                  scale: 1,
                }}
                whileHover={{
                  borderColor: "#ffffff",
                  scale: 1.01,
                }}
                transition={{
                  scale: {
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                    mass: 1.2,
                  },
                  default: {
                    type: "tween",
                    duration: 0.2,
                    ease: "easeOut",
                  },
                }}
                onMouseEnter={setHovered}
                onMouseLeave={setDefault}
                className="backdrop-blur-lg p-4 mb-4 rounded-md border flex items-center justify-start cursor-pointer bg-base-dark-opacity"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="flex space-x-2 overflow-x-auto">
                  {attachments.map((file, index) => (
                    <div key={index} className="relative flex-shrink-0">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Attachment ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 transition-all duration-200 hover:bg-red-700"
                        aria-label="Remove"
                      >
                        <X size={16} weight="bold" />
                      </button>
                    </div>
                  ))}

                  {attachments.length < MAX_ATTACHMENTS && (
                    <button
                      type="button"
                      onClick={handleAddFiles}
                      className="w-32 h-32 flex items-center justify-center border border-dashed border-gray-600 rounded-md transition-all duration-200 hover:bg-gray-800"
                    >
                      <Plus size={24} className="text-gray-400" weight="bold" />
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{
                  borderColor: "#4B5563",
                  borderStyle: "dashed",
                  scale: 1,
                }}
                whileHover={{
                  borderColor: "#ffffff",
                  scale: 1.01,
                }}
                transition={{
                  scale: {
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                    mass: 1.2,
                  },
                  default: {
                    type: "tween",
                    duration: 0.2,
                    ease: "easeOut",
                  },
                }}
                onMouseEnter={setHovered}
                onMouseLeave={setDefault}
                className="backdrop-blur-lg p-4 py-10 lg:py-16 mb-4 rounded-md border flex items-center justify-center cursor-pointer bg-base-dark-opacity"
                onClick={handleAddFiles}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="text-center">
                  <Text className="!text-gray-300" variant="mono" weight="600">
                    PICK A FILE <span className="text-gray-400">OR</span> DROP
                    IT HERE
                  </Text>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {fileError && (
                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="text-red-500 mb-4 text-xs"
                >
                  *{fileError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 gap-4">
          <Text
            color="white"
            variant="mono"
            className="w-1/2 leading-4 !text-xs md:!text-sm !text-gray-400"
            size="sm"
          >
            WE WILL VALIDATE YOUR SUBMISSION BEFORE YOU CAN SEE IT FEATURED IN
            JOYCO IN PLACES. THIS NORMALLY TAKES 1-2 DAYS.
          </Text>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-1/2 flex justify-center text-nowrap"
            color="white"
          >
            {isSubmitting ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center"
              >
                SENDING...
              </motion.div>
            ) : (
              "LFG SEND"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
