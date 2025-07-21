import React from "react";
import { ModalProps } from "../../../types/commonTypes";

const NewGeneralModal: React.FC<ModalProps> = ({
  isActive,
  header,
  body,
  footer,
  id,
  className,
}) => {

  return (
    <div
      id={id}
      data-testid="new-general-modal"
      className={`
        rounded
        fixed inset-0 
        flex justify-center z-100 items-center transition-opacity duration-300
        bg-black/50
        ${isActive === id ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <div className={`bg-white rounded min-w-lg ${className}`}>
        <div className="bg-neutral-100 uppercase p-6 font-bold rounded flex justify-between">
          <div className="text-sm my-auto w-full">{header}</div>
        </div>
        <div
          data-testid="new-general-modal-body"
          className="bg-white mx-auto duration-300 rounded-b p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {body}
        </div>
        {footer && (
          <div className="bg-neutral-100 p-6 rounded-b">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewGeneralModal;
