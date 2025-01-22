/* eslint-disable react/prop-types */
// components/SubscriptionsList.js

import { FiTrash2 } from "react-icons/fi"; // Importing a trash icon for the unsubscribe action
import { useSubscriptions } from "../hooks/subscriptions";
import { useState } from "react";

const SubscriptionsList = ({ userId }) => {
  const { subscriptions, loading, error, unsubscribe } =
    useSubscriptions(userId);
  subscriptions.map((sub) => {
    console.log(sub?.createdAt);
  });
  const [message, setMessage] = useState("");
  const onDelete = (subId) => {
    unsubscribe(subId);
    setMessage("You unsubscribed successfully");
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (subscriptions.length === 0)
    return (
      <div className="text-black flex justify-center items-center text-xl">
        No subscriptions found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Your Subscriptions
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="bg-white shadow-lg rounded-lg p-5 transition-transform transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold mb-2">
              {sub.neighborhoodName}
            </h3>
            <p className="text-gray-600 mb-4">
              Subscribed on:
              {new Date(sub?.createdAt?.seconds * 1000).toLocaleDateString()}
            </p>
            <button
              onClick={() => onDelete(sub.id)}
              className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors w-full"
            >
              <FiTrash2 className="mr-2" />
            </button>
          </div>
        ))}
      </div>
      {message && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
};

export default SubscriptionsList;
