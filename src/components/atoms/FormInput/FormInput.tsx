import React, { forwardRef } from "react";
import { FormInputProps } from "./FormInput.types";

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, hasError = false, className = "", ...props }, ref) => {
    const borderClass =
      hasError || error ? "border-red-500" : "border-gray-700";

    return (
      <div className="space-y-2">
        {label && (
          <label className="block uppercase text-sm font-medium">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          className={`w-full p-3 bg-gray-900 border rounded-md focus:outline-none focus:border-blue-500 ${borderClass} ${className}`}
          {...props}
        />

        {error && <p className="text-red-500 text-xs">*{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
