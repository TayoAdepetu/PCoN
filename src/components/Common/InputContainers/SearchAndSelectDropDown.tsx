import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import SearchInput from "./SearchInput";

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

const SearchAndSelectDropDown: React.FC<SelectDropdownProps> = ({
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

  const handleUseCustomEntry = () => {
    setActiveItem(searchTerm);
    setId(""); // empty ID for custom entries
    setIsActive(false);
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
                  className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                >
                  {String(item[nameField] || "")}
                </li>
              ))}
            </ul>
          ) : searchTerm ? (
            <div>
              <div className="text-gray-500 p-2 text-sm">No matches found.</div>
              <button
                type="button"
                onClick={handleUseCustomEntry}
                className="mt-2 w-full bg-green-800 text-white p-2 rounded-md hover:bg-green-700 text-center text-sm"
              >
                ➔ Use "{searchTerm}"
              </button>
            </div>
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

export default SearchAndSelectDropDown;
