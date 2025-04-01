import React from "react";
import { CountrySelectorProps } from "./CountrySelector.types";

const CountrySelector: React.FC<CountrySelectorProps> = ({
  countryOptions,
  countryCode,
  error,
  hasError = false,
  selectProps,
  label,
}) => {
  const borderClass = hasError || error ? "border-red-500" : "border-gray-700";

  return (
    <div className="space-y-2">
      {label && (
        <label className="block uppercase text-sm font-medium">
          {label}
          {selectProps.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="flex">
        <div className="w-1/4">
          <input
            type="text"
            value={countryCode}
            readOnly
            className={`w-full p-3 bg-gray-900 border ${borderClass} rounded-l-md`}
          />
        </div>
        <div className="w-3/4">
          <select
            className={`w-full p-3 bg-gray-900 border ${borderClass} rounded-r-md focus:outline-none focus:border-blue-500 appearance-none`}
            {...selectProps}
          >
            <option value="">Selecciona un país</option>
            {countryOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="text-red-500 text-xs">*{error}</p>}
    </div>
  );
};

export default CountrySelector;
