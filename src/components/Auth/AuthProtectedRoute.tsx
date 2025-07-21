import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store/rootReducer";
import { handleLogout } from "../../helpers/apiCalls";
import { useEffect } from "react";

const AuthProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);
  const csrfExpiry = useSelector((state: RootState) => state.auth.csrfExpiry);
  const currentTime = new Date().getTime();

  // logout if token is invalid or expired
  useEffect(() => {
    if (!token || !csrfExpiry || currentTime > csrfExpiry) {
      handleLogout(dispatch); // handle cleanup async, but redirect is sync
    }
  }, [token, csrfExpiry, currentTime, dispatch]);

  // Check and redirect synchronously
  if (!token || !csrfExpiry || currentTime > csrfExpiry) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthProtectedRoute;
