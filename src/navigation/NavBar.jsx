/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { links, notAuthorizedLinks } from "../assets/data/links";
import { signOut } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import logo from "../assets/logo.png";

const Navigation = ({ user }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu open/close

  const formattedLinks = user ? links : notAuthorizedLinks;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md sticky z-50 top-0">
      <div className="max-w-full mx-auto px-2 md:px-4 py-2 flex justify-between items-center">
        {/* Website Title */}
        <div className="text-sm sm:text-base md:text-lg font-bold truncate">
          <Link to="/">
            <img src={logo} alt="website logo" className="w-40 h-8" />
          </Link>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Desktop navigation links */}
        <div className="hidden lg:flex lg:space-x-4">
          {formattedLinks?.map((item) => (
            <Link
              key={item.name}
              to={item.path ? `/${item.path}` : `/${item.name.toLowerCase()}`}
              className="capitalize text-sm md:text-base text-white hover:text-gray-400"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Logout button for desktop */}
        {user && (
          <button
            onClick={handleLogout}
            className="hidden lg:block bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-3 md:px-4 py-1 rounded-lg"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-14 left-0 right-0 bg-gray-800 text-white py-2 px-2 border-t border-gray-700">
          {formattedLinks?.map((item) => (
            <Link
              key={item.name}
              to={item.path ? `/${item.path}` : `/${item.name.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm sm:text-base hover:text-gray-400"
            >
              {item.name}
            </Link>
          ))}
          {user && (
            <button
              onClick={handleLogout}
              className="block py-2 text-sm sm:text-base text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
