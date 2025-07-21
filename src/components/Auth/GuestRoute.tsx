// GuestRoute.tsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/rootReducer";

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  console.log("GuestRoute - Token:", token);
  const csrfExpiry = useSelector((state: RootState) => state.auth.csrfExpiry);

  const currentTime = new Date().getTime();

  if (token && csrfExpiry && currentTime < csrfExpiry) {
    console.log("GuestRoute - Redirecting to /dashboard");
    console.log("csrfExpiry: ", csrfExpiry);
    console.log("currentTime: ", currentTime);

    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default GuestRoute;
