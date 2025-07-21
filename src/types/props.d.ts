import type {
  Dispatch,
  FormEventHandler,
  HTMLAttributes,
  RefObject,
} from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
}

interface ForgotPasswordFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  loading: boolean;
}

interface OtpVerificationFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  email: string;
  otp: string[];
  handleOtpChange: (index: number, value: string) => void;
  otpRefs: RefObject<HTMLInputElement[]>;
  loading: boolean;
  setCardType: Dispatch<
    SetStateAction<
      "forgotPassword" | "otpVerification" | "setNewPassword" | "verifyEmail"
    >
  >;
}

interface SetNewPasswordFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  confirmPassword: string;
  setPassword: Dispatch<SetStateAction<string>>;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  loading: boolean;
}

interface CircularProgressBarProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  emptyColor?: string;
  textColor?: string;
}

interface SolutionCardProps {
  title: string;
  description: string;
}