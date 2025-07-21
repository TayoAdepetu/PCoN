// Store/auth/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

type AuthSliceState = {
  token: boolean | null;
  csrfExpiry: number | null;
  user: User | null;
  redirectPath: string | null;
};

const initialState: AuthSliceState = {
  token: false,
  csrfExpiry: null,
  user: null,
  redirectPath: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      console.log("authSlice - loginUser:", action.payload);
      console.trace("Dispatching loginUser from:"); // Add this line
      state.token = action.payload.token;
      state.csrfExpiry = action.payload.csrfExpiry;
      state.user = action.payload.user;
      state.redirectPath = null;
    },
    setToken(state, action) {
      console.log("authSlice - setToken:", action.payload);
      state.token = action.payload.token;
      state.csrfExpiry = action.payload.csrfExpiry;
    },
    updateUser(state, action) {
      console.log("authSlice - updateUser:", action.payload);
      state.user = action.payload;
    },
    logoutUser(state) {
      console.log("authSlice - logoutUser");
      state.token = null;
      state.csrfExpiry = null;
      state.user = null;
      state.redirectPath = null;
    },
    signupUser(state, action) {
      console.log("authSlice - signupUser:", action.payload);
      state.token = action.payload.token;
    },
    setRedirectPath(state, action) {
      console.log("authSlice - setRedirectPath:", action.payload);
      state.redirectPath = action.payload;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice;
