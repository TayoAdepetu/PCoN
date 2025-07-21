import { FaArrowLeft } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/Common/Buttons/PrimaryButton";

const RootError = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 items-center justify-center text-center min-h-[80vh]">
      <FiAlertTriangle className="text-gray-700 text-3xl" />
      <h1 className="text-xl font-semibold">An error occurred</h1>

      <p>RootError.</p>

      <PrimaryButton
        onClick={() => window.location.reload()}
        style="w-[200px] font-semibold mb-2"
      >
        Reload Page
      </PrimaryButton>
      <button
        onClick={() => navigate(-1)}
        className="flex gap-2 border-b-primary text-primary"
      >
        <FaArrowLeft className="text-primary-light text-2xl" />
        Go back
      </button>
    </div>
  );
};

export default RootError;
