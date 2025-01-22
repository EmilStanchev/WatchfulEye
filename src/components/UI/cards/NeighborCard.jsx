import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const NeighborCard = ({ incident }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="relative h-48">
        <img
          src={incident?.images[0]}
          alt={incident?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white px-3 py-1 text-sm rounded-br-lg">
          {incident?.neighborhood}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
          {incident?.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {incident?.description}
        </p>
        <div className="mt-auto flex justify-between items-center text-sm text-gray-500">
          <span>{new Date(incident?.createdAt).toLocaleDateString()}</span>
          <Link
            to="/"
            className="px-4 py-1 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NeighborCard;
