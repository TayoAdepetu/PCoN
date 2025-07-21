import AuthLayout from "../../components/Auth/AuthLayout";
import CreateAccountForm from "../../components/Auth/SignUpForm";
import { Helmet } from "react-helmet-async";

export default function SignupPage() {
  return (
    <AuthLayout>
      <Helmet>
        <title>RMKS - Signup</title>
        <meta
          name="description"
          content="Signup to your project management system."
        />
        <meta property="og:title" content="RMKS - Signup" />
        <meta
          property="og:description"
          content="Signup to your project management system."
        />
      </Helmet>

      <CreateAccountForm />
    </AuthLayout>
  );
}
