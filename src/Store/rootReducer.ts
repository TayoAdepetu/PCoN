import { combineReducers } from "redux";
import authSlice from "./auth/authSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
