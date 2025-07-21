import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface SelectDropdownProps {
  title: string;
  list: Record<string, unknown>[];
  idField: string;
  nameField: string;
  selectedId: string;
  setSelectedId: (val: string) => void;
  border?: string;
}

const SimpleSelectDropDow: React.FC<SelectDropdownProps> = ({
  title,
  list,
  idField,
  nameField,
  selectedId,
  setSelectedId,
  border = "border-gray-300",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedItem = list.find((item) => item[idField] === selectedId);
  const selectedName = selectedItem
    ? String(selectedItem[nameField])
    : "Select...";

  return (
    <div className="relative">
      <label className="block mb-2 font-semibold">{title}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full border ${border} py-3 px-5 rounded flex justify-between items-center`}
      >
        <span>{selectedName}</span>
        <FaChevronDown className="ml-2 text-sm" />
      </button>
      {isOpen && (
        <ul className="absolute py-2 px-3 z-10 mt-1 w-full bg-white border rounded shadow-md max-h-60 overflow-auto">
          {list.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedId(String(item[idField]));
                setIsOpen(false);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {String(item[nameField])}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SimpleSelectDropDow;
