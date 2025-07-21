import React from "react";
import { TextAreaProps } from "../../../types/commonTypes";

const TextArea: React.FC<TextAreaProps> = ({
  style = "w-full",
  title,
  placeholder,
  value,
  setValue,
  readOnly,
  rows,
}) => {
  return (
    <div className={`flex flex-col ${style}`}>
      <label className={`font-semibold text-neutral-800`} htmlFor={title}>
        {title}
      </label>
      <textarea
        id={title}
        value={value}
        cols={10}
        rows={rows}
        readOnly={readOnly || false}
        onChange={(e) => setValue && setValue(e.target.value)}
        placeholder={placeholder || ""}
        className={`bg-white py-3 px-5 w-full border text-sm md:text-base border-neutral-200 rounded focus:outline-hidden`}
      ></textarea>
    </div>
  );
};

export default TextArea;
