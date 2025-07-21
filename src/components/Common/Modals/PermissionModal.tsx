import React from "react";
import { PermissionModalProps } from "../../../types/commonTypes";

const PermissionModal: React.FC<PermissionModalProps> = ({
  isActive,
  setIsActive,
  children,
  title,
  buttons,
  resetFunc,
}) => {
  return (
    <div
      className={`fixed inset-0 bg-[#00000050] flex justify-center z-100 items-center transition-opacity duration-300 ${
        isActive === title ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => {
        if (resetFunc && setIsActive) {
          resetFunc();
          setIsActive(null);
        }
      }}
    >
      <div
        className={`bg-white w-[90%] md:w-3/4 lg:w-2/3 mx-auto max-w-[730px] max-h-[90%] overflow-y-scroll rounded-md shadow-lg transform transition-transform duration-300 ${
          isActive === title ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <div className="sticky flex justify-center items-center h-20 md:pr-16 bottom-0 bg-white border-t left-0 right-0">
          {buttons}
        </div>
      </div>
    </div>
  );
};

export default PermissionModal;
