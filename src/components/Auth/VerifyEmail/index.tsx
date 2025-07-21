import Spinner from "../../Common/Spinner/Spinner";
import { apis } from "../../../utils/apis";
import axios from "axios";
import { FormEventHandler, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SetNewPasswordForm from "../ForgotPasswordForms/SetNewPasswordFom";
import { useParams, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSetNewPassword: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        apis.setNewPassword,
        {
          email,
          password,
          password_confirmation: confirmPassword,
          password_token: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      toast.success("Password changed! Please login.");
      setLoading(false);
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await axios.post(
          apis.verifyEmail,
          {
            token,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        toast.success(
          "Email verification successful. Please set a new password",
        );
        setMessage("One moment...");
        setTimeout(() => setShowPasswordForm(true), 3000);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.message);
        } else {
          toast.error("An unknown error occurred");
          setMessage("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (showPasswordForm) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Set a new password
        </h2>

        <SetNewPasswordForm
          onSubmit={handleSetNewPassword}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          loading={loading}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center text-center p-4">
      {loading ? (
        <>
          <Spinner className="h-4" />
          <p className="text-xl font-semibold my-4">Verifying your email...</p>
        </>
      ) : (
        <>
          <p className="font-semibold text-2xl">{message}</p>
        </>
      )}
    </div>
  );
}
