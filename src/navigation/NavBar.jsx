/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { links, notAuthorizedLinks } from "../assets/data/links";
import { signOut } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import logo from "../assets/logo.png";
import NotificationModal from "../components/reusable/NotificationModal";
import { FaEnvelope } from "react-icons/fa";
import { useNotifications } from "../hooks/notifications";

const Navigation = ({ user }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu open/close
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formattedLinks = user ? links : notAuthorizedLinks;
  const { notifications, notificationsRefetch } = useNotifications(user?.uid);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <nav className="bg-gray-800 text-white shadow-md sticky z-50 top-0">
      <div className="max-w-full mx-auto px-2 md:px-4 py-2 flex justify-between items-center">
        <div className="flex gap-10">
          <div className="text-sm sm:text-base md:text-lg font-bold truncate">
            <Link to="/">
              <img src={logo} alt="website logo" className="w-40 h-12" />
            </Link>
          </div>
          <div className="hidden lg:flex lg:space-x-4 gap-10 justify-center items-center">
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
          {user && (
            <button
              className="relative  hover:bg-gray-600 text-white text-sm px-3 py-2 rounded-lg"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <FaEnvelope size={18} />
              {notifications?.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-2 py-1">
                  {notifications?.length}
                </span>
              )}
            </button>
          )}
          {isModalOpen && (
            <NotificationModal
              closeModal={closeModal}
              notifications={notifications}
              refreshNotifications={notificationsRefetch}
            />
          )}
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
