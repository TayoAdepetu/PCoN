import { combineReducers } from "redux";
import authSlice from "./auth/authSlice";
import dashboardNotificationSlice from "./dashboardNotificationSlice";


const rootReducer = combineReducers({
  auth: authSlice.reducer,
  dashboardnotifications: dashboardNotificationSlice.reducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
