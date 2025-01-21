/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { links, notAuthorizedLinks } from "../assets/data/links";
import { signOut } from "firebase/auth";
import { auth } from "../../FirebaseConfig";

const Navigation = ({ user }) => {
  const navigate = useNavigate();

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
    <nav className="bg-gray-800 text-white shadow-md sticky z-50 top-0 ">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between">
        <div className="text-lg font-bold flex justify-center items-center">
          <Link to="/">Neighborhood Watch</Link>
        </div>
        <div className="flex space-x-4 gap-5 justify-center items-center">
          {formattedLinks?.map((item) => (
            <Link
              to={item?.path ? `/${item?.path}` : `/${item.name.toLowerCase()}`}
              key={item.name}
              className="flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-white  hover:text-gray-600 m-2"
            >
              <span className="capitalize">{item.name}</span>
            </Link>
          ))}
        </div>
        {user && (
          <button
            onClick={handleLogout}
            className=" bg-red-600 hover:bg-red-700 text-white px-4 rounded-lg "
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
