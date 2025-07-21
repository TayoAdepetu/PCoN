import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Spinner from "./components/Common/Spinner/Spinner";
import AuthProtectedRoute from "./components/Auth/AuthProtectedRoute";
import GuestRoute from "./components/Auth/GuestRoute";
import { ToastContainer } from "react-toastify";
import { useOnlineStatus } from "./helpers/useOnlineStatus";
import RootPage from "./Pages/RootPage";
import RootError from "./Pages/RootError";
// import InstallPrompt from './utils/InstallPrompt';

// import RenderError from "./Pages/RenderError";

import HomePage from "./Pages/HomePages/HomePage";

// auth pages

const SignupPage = React.lazy(() => import("./Pages/Auth/NewSignupPage"));

import VerifyEmailPage from "./Pages/Auth/NewVerifyEmailPage";

const LoginPage = React.lazy(() => import("./Pages/Auth/NewLoginPage"));

const ForgotPasswordPage = React.lazy(
  () => import("./Pages/Auth/NewForgotPasswordPage"),
);

const PasswordResetPage = React.lazy(
  () => import("./Pages/Auth/NewPasswordResetPage"),
);

const UserProfile = React.lazy(() => import("./Pages/User/MyProfile"));

const ProfilePage = React.lazy(() => import("./Pages/User/ProfilePage"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <RootError />,
    children: [
      // {
      //   path: "",
      //   element: (
      //     <GuestRoute>
      //       <LoginPage />
      //     </GuestRoute>
      //   ),
      // },
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "sign-up",
        element: <SignupPage />,
      },
      {
        path: "verify-email",
        element: <VerifyEmailPage />,
      },
      {
        path: "login",
        element: (
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        ),
      },

      {
        path: "reset-password/:token",
        element: <PasswordResetPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "my-profile",
        element: (
          <AuthProtectedRoute>
            <UserProfile />
          </AuthProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <AuthProtectedRoute>
            <ProfilePage />
          </AuthProtectedRoute>
        ),
      },
    ],
  },
]);

export default function App() {
  useOnlineStatus();

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen w-screen">
          <Spinner className="h-4" />
        </div>
      }
    >
      <RouterProvider router={router} />
      {/* <InstallPrompt /> */}
      <ToastContainer position="top-left" />
    </Suspense>
  );
}
