import AsyncSelect from "react-select/async";
import { forwardRef } from "react";
import type {
  ActionMeta,
  SingleValue,
  CSSObjectWithLabel,
  GroupBase,
} from "react-select";
import type { SelectInstance } from "react-select";

export interface CategoryOption {
  value: string;
  label: string;
  [key: string]: unknown;
}

interface MyReactSelectProps {
  style?: string;
  title?: string;
  placeholder?: string;
  loadOptions?: (inputValue: string) => Promise<CategoryOption[]>;
  defaultOptions?: CategoryOption[];
  value?: CategoryOption | null;
  onChange?: (
    option: SingleValue<CategoryOption>,
    actionMeta: ActionMeta<CategoryOption>,
  ) => void;
  isClearable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  menuPortalTarget?: HTMLElement;
}

const Combobox = forwardRef<
  SelectInstance<CategoryOption, false, GroupBase<CategoryOption>>,
  MyReactSelectProps
>(
  (
    {
      style = "w-full",
      title,
      placeholder = "Select or search...",
      loadOptions,
      defaultOptions = [],
      value,
      onChange,
      isClearable = true,
      isDisabled = false,
      isLoading = false,
      className,
      menuPortalTarget,
    },
    ref,
  ) => {
    const customStyles = {
      control: (
        provided: CSSObjectWithLabel,
        state: { isFocused: boolean },
      ) => ({
        ...provided,
        padding: "0 1px",
        margin: "0",
        borderColor: state.isFocused ? "#e4e4e7" : "#e4e4e7",
        boxShadow: state.isFocused ? "0 0 0 0px #3b82f6" : "none",
        "&:hover": {
          borderColor: state.isFocused ? "#e4e4e7" : "#e4e4e7",
        },
        minHeight: "42px",
        borderRadius: "3px",
      }),
      option: (
        provided: CSSObjectWithLabel,
        state: { isSelected: boolean; isFocused: boolean },
      ) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? "#009DDB"
          : state.isFocused
            ? "#e4e4e7"
            : "white",
      }),
      placeholder: (provided: CSSObjectWithLabel) => ({
        ...provided,
        color: "#9ca3af",
      }),
      menuPortal: (base: CSSObjectWithLabel) => ({ ...base, zIndex: 9999 }),
    };

    return (
      <div className={`flex flex-col ${style}`}>
        {title && (
          <label className="font-semibold text-neutral-800" htmlFor={title}>
            {title}
          </label>
        )}
        <AsyncSelect<CategoryOption>
          ref={ref}
          className={className}
          placeholder={placeholder}
          loadOptions={loadOptions}
          defaultOptions={defaultOptions}
          value={value}
          onChange={onChange}
          isClearable={isClearable}
          isDisabled={isDisabled}
          isLoading={isLoading}
          cacheOptions
          styles={customStyles}
          noOptionsMessage={({ inputValue }) =>
            inputValue
              ? `No options found for "${inputValue}"`
              : "No options available"
          }
          loadingMessage={() => "Loading..."}
          menuPortalTarget={menuPortalTarget}
        />
      </div>
    );
  },
);

export default Combobox;
