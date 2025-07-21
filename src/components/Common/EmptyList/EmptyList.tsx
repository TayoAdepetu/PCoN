import Spinner from "../Spinner/Spinner";

interface EmptyListProps {
  children?: React.ReactNode;
  includeBg?: boolean;
  loading: boolean;
}

export default function EmptyList({
  children = "Empty.",
  includeBg,
  loading,
}: EmptyListProps) {
  return (
    <p
      className={`w-full flex italic items-center gap-2 justify-center ${
        includeBg ? "p-4 rounded-md bg-white" : ""
      }`}
    >
      {loading ? <Spinner /> : children}
    </p>
  );
}
