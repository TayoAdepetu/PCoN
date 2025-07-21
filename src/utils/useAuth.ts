import { useSelector } from "react-redux";
import { RootState } from "../Store/rootReducer";

export const useAuth = () => {
  return useSelector((state: RootState) => state.auth.user?.id);
};
