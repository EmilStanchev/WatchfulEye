/* eslint-disable react/prop-types */
import { FiTrash2 } from "react-icons/fi";
import { useSubscriptions } from "../hooks/subscriptions";
import { useState } from "react";

const SubscriptionsList = ({ userId }) => {
  const { subscriptions, loading, error, unsubscribe } =
    useSubscriptions(userId);
  const [message, setMessage] = useState("");

  const onDelete = async (subId) => {
    try {
      await unsubscribe(subId);
      setMessage("You unsubscribed successfully");
    } catch (err) {
      setMessage("Failed to unsubscribe. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-500 text-lg">
        Loading your subscriptions...
      </div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (subscriptions.length === 0)
    return (
      <div className="text-center text-gray-600 text-xl mt-10">
        No subscriptions found.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        Your Subscriptions
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-xl rounded-xl p-6 transform transition-transform hover:scale-105 hover:shadow-2xl"
          >
            <h3 className="text-2xl font-semibold mb-3 text-white">
              {sub.neighborhoodName}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Subscribed on:{" "}
              <span className="text-gray-300">
                {new Date(sub?.createdAt?.seconds * 1000).toLocaleDateString()}
              </span>
            </p>
            <button
              onClick={() => onDelete(sub.id)}
              className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg w-full transition-all duration-300 ease-in-out"
            >
              <FiTrash2 className="mr-2 text-lg" /> Unsubscribe
            </button>
          </div>
        ))}
      </div>
      {message && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-lg shadow-md text-center transition-opacity duration-300 ease-in-out">
          {message}
        </div>
      )}
    </div>
  );
};

export default SubscriptionsList;
