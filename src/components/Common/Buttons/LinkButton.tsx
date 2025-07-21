import React from "react";
import { PrimaryButtonProps } from "../../../types/commonTypes";

const LinkButton: React.FC<PrimaryButtonProps> = ({
  children,
  style,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-sm cursor-pointer bg-primary font-semibold text-white py-3 rounded-md hover:bg-transparent hover:text-primary transition-all duration-300 border border-primary ${style}`}
    >
      {children}
    </button>
  );
};

export default LinkButton;
