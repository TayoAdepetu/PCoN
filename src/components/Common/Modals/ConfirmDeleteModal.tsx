import GeneralModal from "./GeneralModal";
import Spinner from "../Spinner/Spinner";
import PrimaryButton from "../Buttons/PrimaryButton.tsx";
import NeutralButton from "../Buttons/NeutralButton.tsx";

type ConfirmDeleteModalProps = {
  id: string;
  title: string;
  showModal: string | null;
  setShowModal: React.Dispatch<React.SetStateAction<string | null>>;
  handleDelete?: () => void;
  loading: boolean;
  paraText?: string;
  confirmButtonText?: string;
  data?: string;
};

export default function ConfirmDeleteModal({
  id,
  title,
  showModal,
  setShowModal,
  handleDelete,
  loading,
  paraText,
  data,
  confirmButtonText = "Confirm",
}: ConfirmDeleteModalProps) {
  return (
    <GeneralModal
      id={id}
      isActive={showModal}
      setIsActive={setShowModal}
      header={<h2>{title}</h2>}
      body={
        paraText && (
          <div>
            <div>{paraText}</div>
            <div className="mt-2 mb-6 font-bold">{data}</div>
          </div>
        )
      }
      footer={
        <div className="flex justify-between">
          <NeutralButton onClick={() => setShowModal(null)}>
            Cancel
          </NeutralButton>

          <PrimaryButton
            style="border-red-500 bg-red-500"
            onClick={handleDelete}
          >
            {loading ? (
              <Spinner />
            ) : confirmButtonText === "Confirm" ? (
             "Delete"
            ) : (
              confirmButtonText
            )}
          </PrimaryButton>
        </div>
      }
    />
  );
}
