import { ReactNode } from "react";

interface GenericCardProps {
  title: string;
  backgroundColor?: string;
  icon?: ReactNode;
  onEdit?: () => void;
  onClick?: () => void;
}

export function GenericCard({
  title,
  backgroundColor = "white",
  icon,
  onClick,
}: GenericCardProps) {
  return (
    <div
      className={`flex items-center justify-between p-3 transition-all border-t-2 ${
        onClick ? "cursor-pointer hover:bg-opacity-80" : ""
      }`}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        {icon && <div className="text-primary-300 flex-shrink-0">{icon}</div>}
        <h2 className="text-sm font-medium text-gray-800 truncate">
          {title}
        </h2>
      </div>
    </div>
  );
}
