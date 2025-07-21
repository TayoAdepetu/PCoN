import axios from "axios";
import { apis } from "../utils/apis";
import { authAction } from "../Store/auth/authSlice";
import { toast } from "react-toastify";
import { onlineManager } from "@tanstack/react-query";
import { Dispatch } from "@reduxjs/toolkit";

// Type definitions
interface ApiErrorResponse {
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
}

type ApiData = Record<string, unknown> | FormData | undefined;

export const sendData = async (url: string, formData: ApiData) => {
  const csrf = extractCsrfToken(); // <-- Extract token here
  const { data } = await axios.post(url, formData, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "X-XSRF-TOKEN": csrf || "", // <-- Send the token in header
    },
    withCredentials: true,
  });
  return data;
};

export const getData = async (url: string) => {
  const { data } = await axios.get(url, {
    headers: {
      // Authorization: token ? `Bearer ${token}` : "",
      Accept: "application/json",
      "Content-Type": "application/json",
      // 'X-XSRF-TOKEN': csrf,
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
  });
  return data;
};

export const getDataWithParams = async (
  url: string,
  params?: Record<string, unknown>,
) => {
  const { data } = await axios.get(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
    params: params, // Pass the params object directly to axios
  });
  return data;
};

// export const putData = async (url: string, formData: ApiData) => {
//   const csrf = extractCsrfToken(); // <-- Extract token here
//   const { data } = await axios.put(url, formData, {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       "X-Requested-With": "XMLHttpRequest",
//       "X-XSRF-TOKEN": csrf || "", // <-- Send the token in header
//     },
//     withCredentials: true,
//   });
//   return data;
// };

export const putData = async (url: string, formData: ApiData) => {
  const csrf = extractCsrfToken();

  const headers: Record<string, string> = {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "X-XSRF-TOKEN": csrf || "",
  };

  // Only set content-type for JSON (let browser set it for FormData)
  if (!(formData instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const { data } = await axios.put(url, formData, {
    headers,
    withCredentials: true,
  });

  return data;
};

export const deleteData = async (url: string) => {
  const csrf = extractCsrfToken();
  const response = await axios.delete(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "X-XSRF-TOKEN": csrf || "",
    },
    withCredentials: true,
  });
  return { data: response };
};

export const uniqueDeleteData = async (url: string, formData: unknown) => {
  const csrf = extractCsrfToken();

  const response = await axios.delete(url, {
    data: formData, // ✅ Send JSON payload here
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // ✅ Keep this for raw JSON
      "X-Requested-With": "XMLHttpRequest",
      "X-XSRF-TOKEN": csrf || "",
    },
    withCredentials: true,
  });

  return { data: response };
};

export const deleteCsrfToken = () => {
  document.cookie =
    "XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=localhost:5173;";
  // You might need to include the domain if it was explicitly set
  // document.cookie = "XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=yourdomain.com;";
};

export const getFreshCsrfToken = async () => {
  // deleteCsrfToken();
  // console.log(extractCsrfToken());
  console.log("Fetching fresh CSRF token...");
  await new Promise((resolve) => setTimeout(resolve, 50)); // Add a 50ms delay
  await getData(apis.sanctum);
};

export const extractCsrfToken = () => {
  const cookies = document.cookie;
  const csrfToken = cookies
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="));
  console.log("THE CSRFFFF", csrfToken);
  return csrfToken ? decodeURIComponent(csrfToken.split("=")[1]) : null;
};

export const handleLogout = async (dispatch: Dispatch) => {
  try {
    console.log("Logout function called");

    if (onlineManager.isOnline()) {
      const csrf = extractCsrfToken();
      console.log("CSRF for logout:", csrf);

      const res = await axios.post(
        apis.logout,
        undefined, // empty body
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": csrf || "",
          },
          withCredentials: true,
        },
      );

      console.log("Logout successful. Status:", res.status);
    }

    dispatch(authAction.logoutUser());
  } catch (error: unknown) {
    const apiError = error as ApiErrorResponse;
    console.error(
      "Logout error:",
      apiError?.response?.status,
      apiError?.response?.data,
    );

    if (
      apiError.response &&
      (apiError.response.status === 419 || apiError.response.status === 401)
    ) {
      dispatch(authAction.logoutUser());
    } else if (apiError.response?.data?.message) {
      toast.error(apiError.response?.data?.message || "Something went wrong!");
    }
  }
};
