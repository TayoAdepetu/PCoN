import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/Common/Spinner/Spinner";
import { apis } from "../../utils/apis";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!email || !token) {
      const msg = "Invalid verification link.";
      toast.error(msg);
      setErrorMessage(msg);
      setLoading(false);
      return;
    }

    axios
      .post(apis.verifyEmail, { email, token })
      .then((response) => {
        console.log(response);
        toast.success("Email verified!");
        setSuccess(true);
      })
      .catch((error) => {
        const msg =
          error.response?.data?.message?.trim() || "Verification failed.";
        console.log(error);
        setErrorMessage(msg);
        toast.error(msg);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email, token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-md text-center bg-white shadow-md rounded-md">
        {loading ? (
          <div className="flex flex-col items-center">
            <Spinner />
            <p className="mt-2 text-gray-600">Verifying your email...</p>
          </div>
        ) : success ? (
          <>
            <h2 className="text-lg font-semibold text-gray-700 mt-4">
              Your email has been successfully verified!
            </h2>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-green-600"
            >
              Go to Login
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <AiOutlineCloseCircle className="text-red-600 text-6xl mb-4" />
            <h2 className="text-lg font-semibold text-red-600">
              Verification failed.
            </h2>
            {errorMessage && (
              <p className="text-gray-700 mt-2">{errorMessage}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
