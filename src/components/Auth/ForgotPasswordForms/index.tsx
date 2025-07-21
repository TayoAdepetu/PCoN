import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, FormEventHandler } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ForgotPasswordForm from "./ForgotPasswordFom";
import SetNewPasswordForm from "./SetNewPasswordFom";
import OtpVerificationForm from "./OtpVerificationForm";
import VerifyYourEmail from "./VerifyYourEmail";
import { apis } from "../../../utils/apis"; // Ensure this path is correct in your React project

export default function ForgotPasswordForms() {

  const navigate = useNavigate();
  const [cardType, setCardType] = useState<
    "forgotPassword" | "otpVerification" | "setNewPassword" | "verifyEmail"
  >();
  const [formType, setFormType] = useState<
    | "forgotPasswordForm"
    | "otpVerificationForm"
    | "setNewPasswordForm"
    | "verifyEmailForm"
    | ""
  >("forgotPasswordForm");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    otpRefs.current = otpRefs.current.slice(0, 6);
  }, []);

  const handleForgotPassword: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        apis.resetPassword,
        { email },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      toast.success("Link sent to your email.");
      setFormType("");
      setCardType("forgotPassword");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
    setLoading(false);
  };

  const handleOtpVerification: FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    setLoading(true);
    try {
      await axios.post(
        apis.verifyOtp,
        { email, otp: enteredOtp },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      toast.success("Password reset successful, please set a new password.");
      setCardType("setNewPassword");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
    setLoading(false);
  };

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
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      toast.success("Password changed");
      navigate("/snippets");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
    setLoading(false);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value !== " ") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && otpRefs.current[index + 1]) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  return (
    <div className={`min-w-xs p-8 rounded bg-white shadow-xl`}>
      <div className="text-2xl font-bold mb-4 text-center">
        {formType === "forgotPasswordForm" && "Forgot Password"}
        {formType === "otpVerificationForm" && "OTP Verification"}
      </div>

      {formType === "forgotPasswordForm" && (
        <ForgotPasswordForm
          onSubmit={handleForgotPassword}
          email={email}
          setEmail={setEmail}
          loading={loading}
        />
      )}

      {formType === "otpVerificationForm" && (
        <OtpVerificationForm
          onSubmit={handleOtpVerification}
          email={email}
          otp={otp}
          handleOtpChange={handleOtpChange}
          otpRefs={otpRefs}
          loading={loading}
          setCardType={setCardType}
        />
      )}

      {formType === "setNewPasswordForm" && (
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
      )}

      {cardType === "verifyEmail" && (
        <VerifyYourEmail
          title="Verify your email address"
          message="A verification link has been sent to your email. Please open it to proceed. It expires in 60 minutes."
        />
      )}
      {cardType === "forgotPassword" && (
        <VerifyYourEmail
          title="Change Your Password"
          message="A link has been sent to your email. Please click on it to proceed. It expires in 60 minutes."
        />
      )}
    </div>
  );
}
