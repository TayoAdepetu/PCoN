import AuthLayout from "../../components/Auth/AuthLayout";
import PasswordResetForm from "../../components/Auth/ForgotPasswordForms/PasswordResetForm";
import { Helmet } from "react-helmet-async";

export default function PasswordResetPage() {
  return (
    <AuthLayout>
      <Helmet>
        <title>RMKS - Password Reset</title>
        <meta
          name="description"
          content="Password Reset."
        />
        <meta property="og:title" content="RMKS - Password Reset" />
        <meta
          property="og:description"
          content="Password Reset."
        />
      </Helmet>
      <PasswordResetForm />
    </AuthLayout>
  );
}
