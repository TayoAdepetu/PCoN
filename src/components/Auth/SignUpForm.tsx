import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../Common/Spinner/Spinner";
import { apis } from "../../utils/apis";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../Common/Buttons/PrimaryButton.tsx";
import { useTranslation } from "react-i18next";
import TextInput from "../Common/InputContainers/TextInput.tsx";
import PasswordInput from "../Common/InputContainers/PasswordInput.tsx";
import { onlineManager } from "@tanstack/react-query";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function SignUpForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.password !== formData.password_confirmation) {
        toast.error(t("check_password_confirmation"));
        setLoading(false);
        return;
      }

      await axios.post(apis.register, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      // setShowVerificationPopup(true); // Show verification message
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err) && err.response) {
        toast.error(t("check_errors_try_again"));
      } else {
        toast.error(t("unknown_error_occurred"));
      }
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-md">
      <h2 className="text-2xl text-center font-bold mb-4">
        {t("create_account")}
      </h2>

      {onlineManager.isOnline() ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <TextInput
              title={t("firstname")}
              type="text"
              value={formData.first_name}
              required={true}
              setValue={(value) =>
                setFormData({ ...formData, first_name: String(value) })
              }
            />
          </div>

          <div className="mb-4">
            <TextInput
              title={t("lastname")}
              type="text"
              value={formData.last_name}
              required={true}
              setValue={(value) =>
                setFormData({ ...formData, last_name: String(value) })
              }
            />
          </div>

          <div className="mb-4">
            <TextInput
              title={t("email")}
              type="text"
              value={formData.email}
              required={true}
              setValue={(value) =>
                setFormData({ ...formData, email: String(value) })
              }
            />
          </div>

          <PasswordInput
            title={t("password")}
            value={formData.password}
            setValue={(value) =>
              setFormData({ ...formData, password: String(value) })
            }
            error={false}
            required={true}
          />

          <PasswordInput
            title={t("confirm_password")}
            value={formData.password_confirmation}
            setValue={(value) =>
              setFormData({ ...formData, password_confirmation: String(value) })
            }
            error={false}
            required={true}
          />

          <div className="flex items-center">
            <input
              required
              type="checkbox"
              id="terms"
              className="mr-2 h-5 w-5 appearance-none border-2 border-gray-400 rounded-md checked:bg-[#FF6B00] checked:border-gray-500 focus:outline-none cursor-pointer relative checked:before:content-['✔'] checked:before:absolute checked:before:text-white checked:before:text-lg checked:before:font-bold checked:before:left-1/2 checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
            />
            <label htmlFor="terms" className="text-gray-600">
              {t("i_agree_to_policy")}
            </label>
          </div>

          <div className="flex">
            <PrimaryButton type="submit" disabled={loading} style="w-full">
              {loading ? <Spinner className="h-4" /> : t("signup")}
            </PrimaryButton>
          </div>

          <p className="text-center text-gray-600">
            {t("already_have_an_account")}?{" "}
            <a href="/login" className="text-[#FF6B00] hover:underline">
              {t("login")}
            </a>
          </p>
        </form>
      ) : (
        <div>
          Sorry, you are unable to create an account because you are currently
          offline. Kindly check your internet connection.
        </div>
      )}

      {/* Verification Popup */}
      {showVerificationPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-bold mb-2">
              {t("thank_you_for_joining")}
            </h2>
            <p className="text-gray-600">{t("verify_email_message")}</p>
            <button
              onClick={() => {
                setShowVerificationPopup(false);
                navigate("/login"); // Redirect after closing
              }}
              className="mt-4 bg-primary hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
            >
              {t("ok")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
