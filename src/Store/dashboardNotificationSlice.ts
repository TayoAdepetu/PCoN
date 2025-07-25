import { createSlice } from "@reduxjs/toolkit";


type DashboardNotificationSliceState = {
  dashboardnotifications: Notification[];
};

const initialState: DashboardNotificationSliceState = {
  dashboardnotifications: [],
};

const dashboardNotificationSlice = createSlice({
  name: "dashboardNotificationSlice",
  initialState,
  reducers: {
    setDashboardNotifications(state, action) {
      state.dashboardnotifications = action.payload;
    },
  },
});

export const dashboardNotificationAction = dashboardNotificationSlice.actions;
export default dashboardNotificationSlice;
