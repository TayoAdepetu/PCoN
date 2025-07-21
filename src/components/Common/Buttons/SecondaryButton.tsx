import { PrimaryButtonProps } from "../../../types/commonTypes";

const SecondaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  style = "",
  type = "button",
  onClick,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-sm cursor-pointer font-bold text-primary-700 bg-primary-100 px-4 py-3 rounded hover:bg-primary-100 transition-all duration-300 border border-primary-300 ${style}`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
