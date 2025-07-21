import React, { useEffect, useRef } from "react";
import { TextInputProps } from "../../../types/commonTypes";

const TextInput: React.FC<TextInputProps> = ({
  style = "w-full",
  title,
  type,
  placeholder,
  value,
  setValue,
  onChange,
  readOnly,
  required = false,
  autofocus = false,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // If the element should autofocus, add the focus after a transition revealed the element.
  useEffect(() => {
    if (autofocus && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [autofocus, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    } else if (setValue) {
      setValue(e.target.value);
    }
  };

  return (
    <div className={`flex flex-col ${style}`}>
      {title && (
        <label className={`font-semibold text-neutral-800`} htmlFor={title}>
          {title}
        </label>
      )}
      <input
        ref={inputRef}
        name={title}
        id={title}
        type={type || "text"}
        value={value}
        required={required || false}
        readOnly={readOnly || false}
        onChange={handleChange}
        placeholder={placeholder || ""}
        className={
          className ||
          `bg-white py-2 px-3 w-full rounded border border-neutral-200 text-sm md:text-base focus:outline-hidden`
        }
      />
    </div>
  );
};

export default TextInput;
