import AuthLayout from "../../components/Auth/AuthLayout";
import LoginForm from "../../components/Auth/LoginForm";
import { Helmet } from "react-helmet-async";

export default function LoginPage() {
  return (
    <AuthLayout>
      <Helmet>
        <title>RMKS - Login</title>
        <meta
          name="description"
          content="Login to your project management system."
        />
        <meta property="og:title" content="RMKS - Login" />
        <meta
          property="og:description"
          content="Login to your project management system."
        />
      </Helmet>
      <LoginForm />
    </AuthLayout>
  );
}
