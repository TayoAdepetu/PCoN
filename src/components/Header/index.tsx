import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store/rootReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { authAction } from "../../Store/auth/authSlice"; // Import the action
import { apis } from "../../utils/apis"; // Adjust the import path as needed


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const TOKEN = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();


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
    } catch (error: any) {
      console.error("Logout failed:", error);

      // Always force logout anyway, regardless of error type
      forceLogout();

      // Optional: only show toast if not a typical unauthenticated case
      if (error.response?.data?.message !== "Unauthenticated.") {
        toast.error(error.response?.data?.message || "Something went wrong!");
      }
    }
  };

  return (
    <header>
      <nav className="hidden md:block bg-white font-semibold py-4 px-8">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center">
          <Link to="/">
            <img
              src="/logo.svg"
              alt="Sample Logo"
              width={150}
              height={64}
              className="w-[40px]"
            />
          </Link>

          <div className="flex gap-12 items-center text-gray-700">
            <Link
              to="/#about"
              className="hover:text-primary transition duration-300"
            >
              About
            </Link>
            <Link
              to="/#impact"
              className="hover:text-primary transition duration-300"
            >
              Impact
            </Link>
            <Link
              to="/#service"
              className="hover:text-primary transition duration-300"
            >
              Service
            </Link>

            {TOKEN ? (
              <div className="flex gap-12 items-center text-gray-700">
                <Link
                  to="/dashboard"
                  className="border border-primary bg-primary hover:bg-green-700 text-white font-semibold py-3 px-6 transition duration-300 rounded-full"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="border border-primary bg-primary hover:bg-green-700 text-white font-semibold py-3 px-6 transition duration-300 rounded-full"
                >
                  Logout
                </button>
              </div>

            ) : (
              <Link
                to="/login"
                className="border border-primary bg-primary hover:bg-green-700 text-white font-semibold py-3 px-6 transition duration-300 rounded-full"
              >
                Login
              </Link>
            )
            }
          </div>
        </div>
      </nav>

      <nav className="md:hidden fixed z-[100] w-full bg-white font-semibold py-4 px-8">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center">
          <Link to="/">
            <img
              src="/logo.svg"
              alt="Sample Logo"
              width={150}
              height={64}
              className="w-[130px]"
            />
          </Link>

          <RiMenu3Line
            onClick={() => setMenuOpen((val) => !val)}
            role="button"
            className={`text-2xl text-primary cursor-pointer transition-all duration-5 ${menuOpen ? "rotate-90" : "rotate-0"
              }`}
          />
        </div>
      </nav>

      <div
        className={`fixed z-[100] w-full top-[88px] bg-white flex flex-col gap-8 md:hidden transition-transform duration-500 ${menuOpen ? "translate-x-0" : "-translate-x-full"
          } px-4 py-8 text-gray-700`}
      >
        <Link
          to="/#about"
          className="hover:text-primary transition duration-300"
        >
          About
        </Link>
        <Link
          to="/#impact"
          className="hover:text-primary transition duration-300"
        >
          Impact
        </Link>
        <Link
          to="/#service"
          className="hover:text-primary transition duration-300"
        >
          Service
        </Link>

        {TOKEN ? (
          <div className="w-full top-[88px] flex flex-col gap-8">
            <Link
              to="/dashboard"
              className="self-start border border-primary bg-primary hover:bg-green-700 text-white font-semibold py-3 px-6 transition duration-300 rounded-full"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="self-start border border-primary bg-primary hover:bg-green-700 text-white font-semibold py-3 px-6 transition duration-300 rounded-full"
            >
              Logout
            </button>
          </div>

        ) : (
          <Link
            to="/login"
            className="self-start border border-primary bg-primary hover:bg-green-700 text-white font-semibold py-3 px-6 transition duration-300 rounded-full"
          >
            Login
          </Link>
        )
        }
      </div>
    </header>
  );
}
