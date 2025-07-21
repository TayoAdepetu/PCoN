import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import SearchInput from "./SearchInput";
import BlockLabelWithIcon from "../../Documents/EditDocument/BlockLabelWithIcon";

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

const SearchAndSelect: React.FC<SelectDropdownProps> = ({
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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = list.filter((item) =>
    String(item[nameField] || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const handleItemSelect = (item: Record<string, unknown>) => {
    setActiveItem(String(item[nameField] || ""));
    setId(String(item[idField] || ""));
    setIsActive(false);
    setSearchTerm("");
  };

  return (
    <div className="relative">
      <label className="block mb-2 font-semibold">{title}</label>

      <button
        type="button"
        onClick={() => setIsActive(!isActive)}
        className={`w-full border ${border} p-2 rounded-md flex justify-between items-center`}
      >
        <span>{activeItem || `Select ${title}`}</span>
        <FaChevronDown className="ml-2 text-sm" />
      </button>

      {isActive && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-md max-h-72 overflow-auto p-2">
          <SearchInput
            placeholder={`Search ${title}`}
            value={searchTerm}
            onChange={(val) => setSearchTerm(val)}
          />

          {filteredList.length > 0 ? (
            <ul>
              {filteredList.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleItemSelect(item)}
                  className="hover:bg-gray-100 cursor-pointer rounded-md mb-2"
                >
                  <BlockLabelWithIcon
                    block={{
                      type: item[idField] as string,
                      label: item[nameField] as string,
                    }}
                    isClickable={false}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500 p-2 text-sm">
              Start typing to search...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndSelect;
