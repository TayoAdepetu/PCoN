import { Link } from "react-router-dom";
import { useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../Store/rootReducer";
import { handleLogout } from "../../../../helpers/apiCalls";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const TOKEN = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  const handleTheLogout = async () => {
    await handleLogout(dispatch);
  };

  return (
    <header>
      <nav className="hidden md:!block bg-white font-semibold py-4 px-8">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center">
          <Link to="/">
            <img
              src="/logo.svg"
              alt="Advanced DND"
              width={150}
              height={64}
              className="w-[130px]"
            />
          </Link>

          <div className="flex gap-12 items-center text-gray-700">
            <Link
              to="/dnd"
              className="hover:text-primary transition duration-300"
            >
              DND
            </Link>
            <Link
              to="/snippets"
              className="hover:text-primary transition duration-300"
            >
              Snippets
            </Link>
            <Link
              to="/component-library"
              className="hover:text-primary transition duration-300"
            >
              UI Components
            </Link>
            {TOKEN ? (
              <div className="flex gap-12 items-center text-gray-700">
                <button
                  onClick={handleTheLogout}
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
            )}
          </div>
        </div>
      </nav>

      <nav className="md:hidden fixed z-[100] w-full bg-white font-semibold py-4 px-8">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center">
          <Link to="/">
            <img
              src="/logo.svg"
              alt="Advanced DND"
              width={150}
              height={64}
              className="w-[130px]"
            />
          </Link>

          <RiMenu3Line
            onClick={() => setMenuOpen((val) => !val)}
            role="button"
            className={`text-2xl text-primary cursor-pointer transition-all duration-5 ${
              menuOpen ? "rotate-90" : "rotate-0"
            }`}
          />
        </div>
      </nav>

      <div
        className={`fixed z-[100] w-full top-[88px] bg-white flex flex-col gap-8 md:hidden transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } px-4 py-8 text-gray-700`}
      >
        <Link to="/dnd" className="hover:text-primary transition duration-300">
          DND
        </Link>
        <Link
          to="/snippets"
          className="hover:text-primary transition duration-300"
        >
          Snippets
        </Link>
        <Link
          to="/component-library"
          className="hover:text-primary transition duration-300"
        >
          UI Components
        </Link>

        {TOKEN ? (
          <div className="w-full top-[88px] flex flex-col gap-8">
            <button
              onClick={handleTheLogout}
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
        )}
      </div>
    </header>
  );
}
