import type React from "react";
import DashboardHeader from "../DashboardHeader";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../../../Store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardNotificationAction } from "../../../Store/dashboardNotificationSlice";
import { RootState } from "../../../Store/rootReducer";
import axios from "axios";
import { apis } from "../../../utils/apis";
import { toast } from "react-toastify";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const TOKEN = useSelector((state: RootState) => state.auth.token);
  const user_ref = useSelector((state: RootState) => state.auth.user?.public_reference_id);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(apis.dashboardnotifications(user_ref!), {
          headers: {
            "Content-Type": "application/json",
            Authorization: TOKEN ? `Bearer ${TOKEN}` : "",
          },
        });
    
        dispatch(dashboardNotificationAction.setDashboardNotifications(response.data.data));
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    };    

    if (TOKEN && user_ref) {
      fetchNotifications();
    }
  }, [TOKEN, user_ref, dispatch]);

  // Get unread notifications count
  const unreadNotifications = useSelector((state: RootState) =>
    state.dashboardnotifications.dashboardnotifications?.filter((n) => !n.read).length || 0
  );
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DashboardHeader unreadNotifications={unreadNotifications} />
        <main className="bg-green-50 min-h-[90vh] pt-[72px]">{children}</main>
      </PersistGate>
    </Provider>
  );
}
