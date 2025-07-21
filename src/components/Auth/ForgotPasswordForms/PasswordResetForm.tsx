import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import TextInput from "../../Common/InputContainers/TextInput";
import PasswordInput from "../../Common/InputContainers/PasswordInput";
import PrimaryButton from "../../Common/Buttons/PrimaryButton";
import { toast } from "react-toastify";
import { apis } from "../../../utils/apis";
import Spinner from "../../Common/Spinner/Spinner";
import axios from "axios";

const PasswordResetForm: React.FC = () => {
  const { token } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const emailParam = queryParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [email] = useState(emailParam); // email pre-filled, readonly
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const setNewPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    if (password !== password_confirmation) {
      toast.error("Passwords do not match");
      return;
    }

    if (!password.trim() || !password_confirmation.trim() || !email.trim()) {
      toast.error("Please fill up all fields");
      return;
    }

    setLoading(true);

    const formData = {
      email,
      password,
      password_confirmation,
      token: token,
    };

    try {
      const response = await axios.post(apis.setNewPassword, formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(response);
      toast.success("Password reset successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err: unknown) {
      setError(true);
      const errorMessage =
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data
          ? String(err.response.data.message)
          : "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      <div
        className="flex items-center gap-5 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="text-primary-light text-2xl" />
        <p>Back</p>
      </div>

      <h4 className="font-semibold text-2xl">Set Your New Password</h4>

      <form className="flex flex-col gap-5" onSubmit={setNewPassword}>
        <TextInput
          title="Email address"
          value={email}
          setValue={() => {}}
          type="email"
          readOnly // Make email readonly
        />

        <PasswordInput
          value={password}
          setValue={setPassword}
          title="Enter New Password"
          placeholder="Enter your password"
          error={error}
        />

        <PasswordInput
          value={password_confirmation}
          setValue={setPasswordConfirmation}
          title="Confirm New Password"
          placeholder="Enter your password again"
          error={error}
        />

        <PrimaryButton type="submit" style="w-full font-bold mt-7">
          {loading ? <Spinner /> : "Reset Password"}
        </PrimaryButton>
      </form>
    </div>
  );
};

export default PasswordResetForm;
