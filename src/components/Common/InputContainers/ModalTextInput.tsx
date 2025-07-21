import React from "react";
import { TextInputProps } from "../../../types/commonTypes";

const ModalTextInput: React.FC<TextInputProps> = ({
  style = "w-full",
  title,
  type,
  placeholder,
  border,
  value = "",
  setValue,
  readOnly,
  color = "",
  validationMsg,
}) => {
  return (
    <div className={`flex flex-col ${style}`}>
      <label className={`font-semibold mb-1 ${color}`} htmlFor={title}>
        {title}
      </label>
      <input
        id={title}
        type={type}
        value={value} // Controlled input
        readOnly={readOnly || false}
        onChange={(e) => setValue?.(e.target.value)}
        placeholder={placeholder || ""}
        className={`bg-white py-2 px-3 w-full border text-sm md:text-base ${validationMsg ? "border-red-500" : border} rounded focus:outline-hidden`}
      />
      {validationMsg && (
        <p className="text-sm pb-2 px-2 text-red-600 rounded-b-lg">
          {validationMsg}
        </p>
      )}
    </div>
  );
};

export default ModalTextInput;
