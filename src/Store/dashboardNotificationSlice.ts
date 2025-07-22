import { createSlice } from "@reduxjs/toolkit";

type DashboardNotificationData = {
  id: number;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
};

type DashboardNotificationSliceState = {
  dashboardnotifications: DashboardNotificationData[];
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
