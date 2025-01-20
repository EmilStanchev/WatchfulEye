import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between">
        <div className="text-lg font-bold">
          <Link to="/">Neighborhood Watch</Link>
        </div>
        <div className="flex space-x-4">
          <Link
            to="/addIncident"
            className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Add Incident
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
