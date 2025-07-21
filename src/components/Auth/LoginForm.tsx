import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apis } from "../../utils/apis";
import {
  getFreshCsrfToken,
  extractCsrfToken,
  sendData,
} from "../../helpers/apiCalls";
import Spinner from "../Common/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/rootReducer";
import { onlineManager } from "@tanstack/react-query";
import { getUserData } from "../../helpers/helperFunctions.ts"; 
import PasswordInput from "../../components/Common/InputContainers/PasswordInput";
import { authAction } from "../../Store/auth/authSlice";
import PrimaryButton from "../Common/Buttons/PrimaryButton.tsx";
import TextInput from "../Common/InputContainers/TextInput.tsx";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const [userData, setUserData] = useState<User | null>(null);
  console.log(userData);


  const fetchUserData = async () => {
    const theUser = await getUserData();
    setUserData(theUser);

    if (theUser) {
      return true;
    } else {
      return false;
    }
  };

  // Get redirectPath from Redux (default to "/dashboard")
  const redirectPath =
    useSelector((state: RootState) => state.auth.redirectPath) || "/dashboard";
  console.log("THE REDIRECT PATHH: ", redirectPath);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Email and password are required.");
      setLoading(false);
      return;
    }

    // if (!onlineManager.isOnline()) {
    //   toast.error("You are offline. Using cached data.");
    //   userData.token = true;
    //   dispatch(authAction.loginUser(userData));
    //   navigate("/dashboard");
    //   setLoading(false);
    //   return;
    // }

    try {
      // Ensure logout to reset any old session
      // await handleLogout(dispatch).catch(() => {}); // Ignore 401s

      await getFreshCsrfToken();

      const csrf = extractCsrfToken();
      if (!csrf) throw new Error("No CSRF token found in cookies.");

      const loginResponse = await sendData(apis.login, { email, password });

      if (loginResponse?.two_factor) {
        toast.info("Two-factor authentication required.");
        return;
      }

      // Now fetch the user data directly (not using useUserData)
      const meResponse = await fetch("/api/user", {
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (!meResponse.ok) throw new Error("Failed to fetch user after login.");

      const user = await meResponse.json();

      await fetchUserData();

      const expiryTime = new Date().getTime() + 1.5 * 60 * 60 * 1000;

      user.token = true;
      user.csrfExpiry = expiryTime;

      dispatch(authAction.loginUser(user));
      navigate("/dashboard");
      toast.success("Welcome back!");
    } catch (err: unknown) {
      console.error(err);
      const errorMessage =
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data
          ? String(err.response.data.message)
          : err &&
              typeof err === "object" &&
              "message" in err &&
              typeof err.message === "string"
            ? err.message
            : "Authentication error.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-w-xs p-8 rounded bg-white shadow-xl`}>
      <div className="text-2xl font-bold mb-4 text-center">Login</div>

      {onlineManager.isOnline() ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextInput
              title="E-Mail"
              type="email"
              setValue={(value) => setEmail(String(value))}
              required={true}
            />
          </div>

          <div className="mb-8">
            <PasswordInput
              title="Password"
              value={password}
              styles="mb-1"
              required={true}
              setValue={setPassword}
              error={false}
            />
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs text-warning-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <div className="flex">
            <PrimaryButton type="submit" disabled={loading} style="w-full">
              {loading ? <Spinner className="h-4" /> : "Login"}
            </PrimaryButton>
          </div>
        </form>
      ) : (
        <div>
          Connect to the internet. You are offline. Please check your connection.
        </div>
      )}

      {onlineManager.isOnline() ? (
        <div className="text-center mt-8">
          <div className="flex flex justify-center text-sm">
            <div className="mr-1">Don't have an account?</div>
            <Link to="/sign-up" className="text-warning-400 underline">
              Signup
            </Link>
          </div>
        </div>
      ) : <></>}

    </div>
  );
}
