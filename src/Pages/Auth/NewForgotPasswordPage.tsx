import AuthLayout from "../../components/Auth/AuthLayout";
import ForgotPasswordForms from "../../components/Auth/ForgotPasswordForms";
import { Helmet } from "react-helmet-async";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <Helmet>
        <title>RMKS - Forgot Password</title>
        <meta
          name="description"
          content="Forgot password."
        />
        <meta property="og:title" content="RMKS - Forgot Password" />
        <meta
          property="og:description"
          content="Forgot password."
        />
      </Helmet>
      <ForgotPasswordForms />
    </AuthLayout>
  );
}
