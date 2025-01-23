/* eslint-disable react/prop-types */
import { useState } from "react";
import { subscribeToNeighborhood } from "../services/subscriptions";
import { neighborhoodsInSofia } from "../assets/data/data";
import SubscriptionsTable from "./SubscriptionsTable";
import { useSubscriptions } from "../hooks/subscriptions";

const ManageSubscriptions = ({ userId }) => {
  const [neighborhood, setNeighborhood] = useState("");
  const [message, setMessage] = useState("");
  const { refetch } = useSubscriptions(userId);

  const handleSubscribe = async () => {
    if (!neighborhood) {
      setMessage("Please choose a neighborhood.");
      return;
    }

    try {
      await subscribeToNeighborhood(userId, neighborhood);
      setMessage("Successfully subscribed!");
      setNeighborhood("");
      refetch();
    } catch (error) {
      setMessage("Subscription failed. Please try again later.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Manage Your Neighborhoods
        </h2>
        <div className="relative">
          <select
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Choose neighborhood
            </option>
            {neighborhoodsInSofia.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <button
            onClick={handleSubscribe}
            className="absolute right-0 top-0 bg-blue-500 text-white px-4 py-3 rounded-r focus:outline-none hover:bg-blue-600"
          >
            Subscribe
          </button>
        </div>
        {message && (
          <div className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md text-center">
            {message}
          </div>
        )}
      </div>
      <SubscriptionsTable userId={userId} />
    </>
  );
};

export default ManageSubscriptions;
