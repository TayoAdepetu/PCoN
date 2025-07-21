import { FiFolder, FiEdit } from "react-icons/fi";

interface SnippetCardProps {
  title: string;
  backgroundColor: string;
}

export function SnippetCard({ title, backgroundColor }: SnippetCardProps) {
  return (
    <div
      className="flex items-center justify-between p-4 transition-all border-t-2"
      style={{ backgroundColor }}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <FiFolder className="text-primary-200 flex-shrink-0" />
        <h2 className="text-sm font-medium text-gray-800 truncate max-w-[180px]">
          {title}
        </h2>
      </div>
      <FiEdit className="text-gray-500 hover:text-gray-700 cursor-pointer flex-shrink-0" />
    </div>
  );
}
