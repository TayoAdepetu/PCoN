// components/SearchInput.tsx
import React from "react";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  value,
  onChange,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
};

export default SearchInput;
