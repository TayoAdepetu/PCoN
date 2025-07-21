import { PrimaryButtonProps } from "../../../types/commonTypes";

const NeutralButton: React.FC<PrimaryButtonProps> = ({
  children,
  style = "border-gray-300",
  type = "button",
  onClick,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-sm cursor-pointer font-bold text-gray-700 bg-neutral-100 px-4 py-3 rounded hover:bg-gray-50 transition-all duration-300 border disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed ${style}`}
    >
      {children}
    </button>
  );
};

export default NeutralButton;
