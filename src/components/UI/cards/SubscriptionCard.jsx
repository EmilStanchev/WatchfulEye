/* eslint-disable react/prop-types */
import { FiTrash2 } from "react-icons/fi";

const SubscriptionCard = ({ sub, openModal }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 transform transition-transform hover:scale-105 hover:shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{sub.neighborhoodName}</h3>
        <button
          onClick={() => openModal(sub.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full"
        >
          <FiTrash2 className="text-sm" />
        </button>
      </div>
      <p className="text-gray-500 text-sm">
        Subscribed on:
        <span className="text-gray-400">
          {new Date(sub?.createdAt?.seconds * 1000).toLocaleDateString()}
        </span>
      </p>
    </div>
  );
};

export default SubscriptionCard;
