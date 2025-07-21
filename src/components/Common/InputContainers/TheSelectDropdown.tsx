import React from "react";
import { FaChevronDown } from "react-icons/fa";

interface SelectDropdownProps {
  title: string;
  list: Record<string, unknown>[];
  idField: string;
  nameField: string;
  isActive: boolean;
  setIsActive: (val: boolean) => void;
  activeItem: string;
  setActiveItem: (val: string) => void;
  setId: (val: string) => void;
  border?: string;
}

const TheSelectDropDown: React.FC<SelectDropdownProps> = ({
  title,
  list,
  idField,
  nameField,
  isActive,
  setIsActive,
  activeItem,
  setActiveItem,
  setId,
  border = "border-gray-300",
}) => {
  return (
    <div className="relative">
      <label className="block mb-2 font-semibold">{title}</label>
      <button
        type="button"
        onClick={() => setIsActive(!isActive)}
        className={`w-full border ${border} p-2 rounded flex justify-between items-center`}
      >
        <span>{activeItem}</span>
        <FaChevronDown className="ml-2 text-sm" />
      </button>
      {isActive && (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded shadow-md max-h-60 overflow-auto">
          {list.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setActiveItem(String(item[nameField] || ""));
                setId(String(item[idField] || ""));
                setIsActive(false);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {String(item[nameField] || "")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TheSelectDropDown;
