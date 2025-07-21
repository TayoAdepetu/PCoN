import { useCallback, useRef } from "react";
import Spinner from "../../Common/Spinner/Spinner";
import { OtpVerificationFormProps } from "../../../types/props";

export default function OtpVerificationForm({
  onSubmit,
  email,
  otp,
  handleOtpChange,
  loading,
  setCardType,
}: OtpVerificationFormProps) {
  // Initialize refs array
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle OTP input change and move focus
  const handleChange = useCallback(
    (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return; // Allow only numbers

      handleOtpChange(index, value);

      if (value && index < otp.length - 1 && otpRefs.current[index + 1]) {
        otpRefs.current[index + 1]?.focus();
      }
    },
    [handleOtpChange, otp.length],
  );

  // Handle OTP paste
  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      const pastedData = e.clipboardData.getData("text").trim();
      if (!/^\d+$/.test(pastedData) || pastedData.length !== otp.length) return;

      pastedData.split("").forEach((char, index) => {
        handleOtpChange(index, char);
        if (index < otp.length - 1 && otpRefs.current[index + 1]) {
          otpRefs.current[index + 1]?.focus();
        }
      });
    },
    [handleOtpChange, otp.length],
  );

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <p className="my-4 text-center">Verify your email: {email}</p>
        <div className="flex gap-4 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              aria-label={`OTP digit ${index + 1}`}
              className="border border-gray-300 text-center rounded-md px-4 py-4 h-12 w-12 focus:outline-none focus:ring-2 focus:ring-primary-light"
              placeholder="-"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onPaste={handlePaste}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !otp[index]) {
                  e.preventDefault();
                  if (index > 0 && otpRefs.current[index - 1]) {
                    otpRefs.current[index - 1]?.focus();
                  }
                }
              }}
              ref={(el) => {
                if (el) {
                  otpRefs.current[index] = el;
                }
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary-light hover:bg-[#2196F3] text-white font-bold py-2 px-4 rounded focus:outline-primary-light mb-2"
        >
          {loading ? <Spinner /> : "Verify OTP"}
        </button>
        <button
          type="button"
          onClick={() => setCardType("forgotPassword")}
          className="text-sm font-semibold text-primary-light hover:text-[#2196F3] mt-2"
        >
          Wrong email? Go back
        </button>
      </div>
    </form>
  );
}
