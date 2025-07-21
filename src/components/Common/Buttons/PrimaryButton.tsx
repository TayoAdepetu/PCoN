import { PrimaryButtonProps } from "../../../types/commonTypes";

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  style = "border-primary-700",
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-sm cursor-pointer border bg-primary-700 font-bold text-white px-4 py-3 rounded transition-all duration-300 disabled:bg-primary-100 disabled:text-primary-300 disabled:border-primary-100 disabled:cursor-not-allowed ${style}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
