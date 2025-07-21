import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { InsertIcon } from "../../../assets/Svgs/GeneralSvgs";

type DropdownAction = {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  toggled?: boolean;
};

interface ActionsDropdownProps {
  actions: DropdownAction[];
}

const InsertSelectDropDown: React.FC<ActionsDropdownProps> = ({ actions }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  const calculateAndSetPosition = () => {
    if (dropdownRef.current) {
      const triggerRect = dropdownRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollX = window.scrollX || document.documentElement.scrollLeft;

      // Get dropdown menu's actual height and width after it has rendered
      const dropdownActualHeight = dropdownMenuRef.current ? dropdownMenuRef.current.offsetHeight : 0; // Use 0 if not rendered yet
      const dropdownActualWidth = dropdownMenuRef.current ? dropdownMenuRef.current.offsetWidth : 0; // Use 0 if not rendered yet

      let topPosition = triggerRect.top + scrollY - dropdownActualHeight - 5;

      if (topPosition < scrollY) {
        topPosition = triggerRect.bottom + scrollY + 5;
      }

      let leftPosition = triggerRect.right + scrollX - dropdownActualWidth;

      if (leftPosition < scrollX) {
        leftPosition = triggerRect.left + scrollX;
      }

      setDropdownPosition({
        top: topPosition,
        left: leftPosition,
      });
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    if (showDropdown) {
      const timer = setTimeout(() => {
        calculateAndSetPosition();
      }, 0);

      const handleResize = () => {
        calculateAndSetPosition();
      };

      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          dropdownMenuRef.current &&
          !dropdownMenuRef.current.contains(event.target as Node)
        ) {
          setShowDropdown(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", handleResize);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [showDropdown]);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block z-50"
    >
      <div
        className="flex items-center justify-center flex-shrink-0"
        onClick={toggleDropdown}
      >
        <InsertIcon className="h-6 text-[#7E7E7E] cursor-pointer" />
      </div>

      {showDropdown && portalTarget && dropdownPosition && (
        ReactDOM.createPortal(
          <div
            ref={dropdownMenuRef}
            style={{
              position: "absolute",
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "6px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              zIndex: 99999,
              minWidth: "160px",
              // Optional: If you see flickering on first open, you might temporarily
              // hide it until positioned, e.g., opacity: dropdownPosition ? 1 : 0
            }}
          >
            {actions.map((action, index) => (
              <div
                key={index}
                onClick={() => {
                  if (action.onClick) action.onClick();
                  setShowDropdown(false); // Close dropdown after action
                }}
                style={{
                  padding: "10px 12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  fontSize: "14px",
                  borderBottom: index !== actions.length - 1 ? "1px solid #f0f0f0" : "none",
                }}
              >
                <span>{action.label}</span>
                {action.icon}
              </div>
            ))}
          </div>,
          portalTarget
        )
      )}
    </div>
  );
};

export default InsertSelectDropDown;
