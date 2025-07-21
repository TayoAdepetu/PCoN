import Spinner from "../../../components/Common/Spinner/Spinner";
import { ForgotPasswordFormProps } from "../../../types/props";
import TextInput from "../../../components/Common/InputContainers/TextInput";
import PrimaryButton from "../../Common/Buttons/PrimaryButton.tsx";

export default function ForgotPasswordForm({
  onSubmit,
  email,
  setEmail,
  loading,
}: ForgotPasswordFormProps) {

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <TextInput
          title="Email"
          type="text"
          placeholder="Enter your email"
          value={email}
          required={true}
          setValue={setEmail}
        />
      </div>

      <div className="flex">
        <PrimaryButton type="submit" disabled={loading} style="w-full">
          {loading ? <Spinner className="h-4"/> : "Verify"}
        </PrimaryButton>
      </div>
    </form>
  );
}
