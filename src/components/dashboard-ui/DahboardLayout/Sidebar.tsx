import { useState } from "react";
import { FaKey, FaBars, FaTimes, FaBell, FaSignOutAlt, FaUser,FaUsers, FaBriefcase, FaSeedling, FaSuperpowers } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { apis } from "../../../utils/apis"; // Adjust the import path as needed
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../../Store/rootReducer";
import { authAction } from "../../../Store/auth/authSlice"; // Import the action

export default function Sidebar({ unreadNotifications }: { unreadNotifications: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const TOKEN = useSelector((state: RootState) => state.auth.token);
  const userRef = useSelector((state: RootState) => state.auth.user?.public_reference_id);

  const forceLogout = () => {
    dispatch(authAction.logoutUser());
    localStorage.removeItem("authToken");
  
    // Add slight delay to let Redux clear before navigation
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };  

  const handleLogout = async () => {
    // const TOKEN = localStorage.getItem("authToken"); // or get from Redux if that's your source
  
    if (!TOKEN) {
      console.warn("No token found, forcing logout.");
      forceLogout();
      return;
    }
  
    try {
      const response = await axios.post(
        apis.logout,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
  
      console.log("Logout successful:", response.data);
      forceLogout();
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error("Logout failed:", error);
  
      // Always force logout anyway
      forceLogout();
  
      // Show toast for unexpected errors
      if (error.response?.data?.message !== "Unauthenticated.") {
        toast.error(error.response?.data?.message || "Something went wrong!");
      }
    }
  };

  const handleChangePassword = async () => {
    try {
      handleLogout(); // Logout the user
      navigate("/forgot-password"); // Redirect to forgot password page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleMyInfo = async () => {
    try {
      navigate("/my-dashboard-info"); // Redirect to forgot password page
    } catch (error) {
      console.error("Dashboard info not loaded:", error);
    }
  };

  const handleSeasonFlow = async () => {
    try {
      navigate(`/seasonflow/farms`); // Redirect to forgot password page
    } catch (error) {
      console.error("Seasonflow not loaded:", error);
    }
  };

  const handleFarmPeeps = async () => {
    try {
      navigate(`/farmpeeps`); // Redirect to forgot password page
    } catch (error) {
      console.error("FarmPeeps not loaded:", error);
    }
  };

  const handleMyFarmPeepsProfile = async () => {
    try {
      navigate(`/farmpeeps/profile/${userRef}`); // Redirect to forgot password page
    } catch (error) {
      console.error("FarmPeeps not loaded:", error);
    }
  };

  const handleFarmJobs = async () => {
    try {
      navigate(`/farmjobs`); // Redirect to forgot password page
    } catch (error) {
      console.error("FarmJobs not loaded:", error);
    }
  };

  const handleMyFarmJobs = async () => {
    try {
      navigate(`/farmjobs/my-jobs/${userRef}`); // Redirect to forgot password page
    } catch (error) {
      console.error("FarmJobs not loaded:", error);
    }
  };

  const handleMyDashboard = async () => {
    try {
      navigate("/dashboard"); // Redirect to forgot password page
    } catch (error) {
      console.error("Dashboard not loaded:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2">
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      {isOpen && (
        <div className="bg-white p-4 shadow-md fixed top-16 left-0 h-full w-64 z-50">
          <ul>
            <li className="py-2">
              <button onClick={handleMyDashboard} className="flex items-center gap-2">
                <FaBriefcase className="text-green-500 hover:text-primary text-xl" />
                My Dashboard
              </button>
            </li>
            <li className="py-2">
              <Link to="/notifications" className="flex items-center gap-2">
                <FaBell className="text-[#FF6B00] hover:text-[#e65800] text-xl" />
                Notifications
                {unreadNotifications >= 0 && (
                  <span className="bg-[#FF6B00] hover:bg-[#e65800] text-white text-xs rounded-full px-2 py-1">
                    {unreadNotifications}
                  </span>
                )}
              </Link>
            </li>
            <li className="py-2">
              <button onClick={handleSeasonFlow} className="flex items-center gap-2">
                <FaSeedling className="text-green-500 hover:text-primary text-xl" />
                SeasonFlow
              </button>
            </li>
            <li className="py-2">
              <button onClick={handleFarmPeeps} className="flex items-center gap-2">
                <FaUsers className="text-green-500 hover:text-primary text-xl" />
                FarmPeeps
              </button>
            </li>
            <li className="py-2">
              <button onClick={handleMyFarmPeepsProfile} className="flex items-center gap-2">
                <FaUsers className="text-green-500 hover:text-primary text-xl" />
                MyFarmPeep
              </button>
            </li>
            <li className="py-2">
              <button onClick={handleFarmJobs} className="flex items-center gap-2">
                <FaUsers className="text-green-500 hover:text-primary text-xl" />
                FarmJobs
              </button>
            </li>
            <li className="py-2">
              <button onClick={handleMyFarmJobs} className="flex items-center gap-2">
                <FaUsers className="text-green-500 hover:text-primary text-xl" />
                MyFarmJobs
              </button>
            </li>
            <li className="py-2">
              <button onClick={handleMyInfo} className="flex items-center gap-2">
                <FaUser className="text-xl" />
                Personal Info
              </button>
            </li>
            <li className="py-2">
              <button onClick={handleChangePassword} className="flex items-center gap-2">
                <FaKey className="text-green-500 hover:text-primary text-xl" />
                Change Password
              </button>
            </li>
            <li className="py-2">
              <Link to="/support" className="flex items-center gap-2">
                <FaSuperpowers className="text-[#FF6B00] hover:text-[#e65800] text-xl" />
                Support
              </Link>
            </li>
            <li className="py-2">
              <button onClick={handleLogout} className="flex items-center gap-2">
                <FaSignOutAlt className="text-[#FF6B00] hover:text-[#e65800] text-xl" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
