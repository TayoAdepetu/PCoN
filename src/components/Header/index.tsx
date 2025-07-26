import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store/rootReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { authAction } from "../../Store/auth/authSlice"; // Import the action
import { apis } from "../../utils/apis"; // Adjust the import path as needed


export default function Header() {
  const location = useLocation();
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
    } catch (error: unknown) {
      console.error("Logout failed:", error);

      // Always force logout anyway, regardless of error type
      forceLogout();

      const errorMessage =
        error &&
          typeof error === "object" &&
          "response" in error &&
          error.response &&
          typeof error.response === "object" &&
          "data" in error.response &&
          error.response.data &&
          typeof error.response.data === "object" &&
          "message" in error.response.data
          ? String(error.response.data.message)
          : "Something went wrong!";

      toast.error(errorMessage);
    }
  };

  return (
    <header>
      <nav className="hidden md:block bg-white font-semibold py-4 px-8 relative z-10">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center">
          <Link to="/" className="cursor-pointer">
            <img
              src="/logo.png"
              alt="Progressive Christians of Nigeria Logo"
              width={70}
              height={70}
            />
          </Link>

          <div className="flex gap-12 items-center text-gray-700">
            <Link
              to="/#about"
              className={`cursor-pointer transition duration-300 ${location.hash === "#about" ? "text-primary-400" : "hover:text-primary-400"
                }`}
            >
              About
            </Link>
            <Link
              to="/#impact"
              className={`cursor-pointer transition duration-300 ${location.hash === "#impact" ? "text-primary-400" : "hover:text-primary-400"
                }`}
            >
              Impact
            </Link>
            <Link
              to="/#service"
              className={`cursor-pointer transition duration-300 ${location.hash === "#service" ? "text-primary-400" : "hover:text-primary-400"
                }`}
            >
              Service
            </Link>

            {TOKEN ? (
              <div className="flex gap-12 items-center text-gray-700">
                <Link
                  to="#dashboard"
                  className={`cursor-pointer border hover:bg-green-700 hover:text-white font-semibold py-3 px-6 transition duration-300 rounded-full ${location.hash === "#dashboard" ? "text-primary-400" : "hover:text-primary-400"
                    }`}
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="cursor-pointer border hover:bg-green-700 hover:text-white font-semibold py-3 px-6 transition duration-300 rounded-full"
                >
                  Logout
                </button>
              </div>

            ) : (
              <Link
                to="#login"
                className={`cursor-pointer border hover:bg-green-700 hover:text-white font-semibold py-3 px-6 transition duration-300 rounded-full ${location.hash === "#login" ? "text-primary-400" : "hover:text-primary-400"
                  }`}              >
                Login
              </Link>
            )
            }
          </div>
        </div>
      </nav>

      <nav className="md:hidden fixed z-[100] w-full bg-white font-semibold py-4 px-8">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center">
          <Link to="/" className="cursor-pointer">
            <img
              src="/logo.png"
              alt="Ekiti Innovation Hub Limited Logo"
              width={70}
              height={70}
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
          className={`cursor-pointer transition duration-300 ${location.hash === "#about" ? "text-primary-400" : "hover:text-primary-400"
            }`}
        >
          About
        </Link>
        <Link
          to="/#impact"
          className={`cursor-pointer transition duration-300 ${location.hash === "#impact" ? "text-primary-400" : "hover:text-primary-400"
            }`}
        >
          Impact
        </Link>
        <Link
          to="/#service"
          className={`cursor-pointer transition duration-300 ${location.hash === "#service" ? "text-primary-400" : "hover:text-primary-400"
            }`}
        >
          Service
        </Link>

        {TOKEN ? (
          <div className="w-full top-[88px] flex flex-col gap-8">
            <Link
              to="#dashboard"
              className={`cursor-pointer self-start border hover:bg-green-700 text-white font-semibold py-3 px-6 transition duration-300 rounded-full ${location.hash === "#dashboard" ? "text-primary-400" : "hover:text-primary-400"
                }`}
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="cursor-pointer self-start border hover:bg-green-700 text-white font-semibold py-3 px-6 transition duration-300 rounded-full"
            >
              Logout
            </button>
          </div>

        ) : (
          <Link
            to="/login"
            className={`cursor-pointer border hover:bg-green-700 hover:text-white font-semibold py-3 px-6 transition duration-300 rounded-full ${location.hash === "#login" ? "text-primary-400" : "hover:text-primary-400"
              }`}           >
            Login
          </Link>
        )
        }
      </div>
    </header>
  );
}
