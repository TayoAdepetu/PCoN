import React, { useEffect, useCallback } from "react";
import { ModalProps } from "../../../types/commonTypes";

const GeneralModal: React.FC<ModalProps> = ({
  isActive,
  setIsActive,
  header,
  body,
  footer,
  resetFunc,
  id,
}) => {
  const handleOnClose = useCallback(() => {
    setIsActive(null);
    if (resetFunc) {
      resetFunc();
    }
  }, [setIsActive, resetFunc]);

  /**
   * ESC key handler to close modal.
   */
  // useEffect(() => {
  //   const handleEscKey = (event: KeyboardEvent) => {
  //     if (event.key === "Escape" && isActive === id) {
  //       handleOnClose();
  //     }
  //   };

  //   window.addEventListener("keydown", handleEscKey);

  //   return () => {
  //     window.removeEventListener("keydown", handleEscKey);
  //   };
  // }, [isActive, id, handleOnClose]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isActive === id) {
        handleOnClose();
      }

      const isSaveCombo =
        (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s";

      if (isSaveCombo && isActive === id) {
        event.preventDefault();

        // Find and submit the first form in the modal
        const modalEl = document.getElementById(id);
        const formEl = modalEl?.querySelector("form");
        if (formEl) {
          (formEl as HTMLFormElement).requestSubmit();
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isActive, id, handleOnClose]);

  return (
    <div
      id={id}
      data-testid="general-modal"
      className={`
        rounded
        fixed inset-0 
        flex justify-center z-100 items-center transition-opacity duration-300
        bg-black/50
        ${isActive === id ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <div className="bg-white rounded min-w-lg">
        <div className="bg-neutral-100 uppercase p-6 font-bold rounded flex justify-between">
          <div className="text-sm my-auto w-full">{header}</div>
          <div className="flex">
            <div onClick={() => handleOnClose()} className="cursor-pointer flex">
              <svg
                className="size-3 my-auto"
                viewBox="0 0 14 14"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                  fill="#5C6C72"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
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

export default GeneralModal;
