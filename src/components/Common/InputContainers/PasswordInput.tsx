import { PasswordInputProps } from "../../../types/commonTypes";
import React, { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput: React.FC<PasswordInputProps> = ({
  styles = "w-full",
  title,
  value,
  setValue,
  placeholder,
  error,
  required = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={`flex flex-col text-sm md:text-base ${styles}`}>
      <label htmlFor={title} className="text-neutral-800">
        {title}
      </label>

      <div className="relative">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`bg-white w-full py-2 px-3 border rounded text-sm md:text-base focus:outline-hidden ${
            error ? "border-error" : "border-neutral-200"
          }`}
          type={`${isVisible ? "text" : "password"}`}
          id={title}
          required={required || false}
          placeholder={placeholder || ""}
        />
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="absolute right-5 top-[50%] -translate-y-[50%]"
        >
          {isVisible ? <FaRegEye /> : <FaEyeSlash />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
