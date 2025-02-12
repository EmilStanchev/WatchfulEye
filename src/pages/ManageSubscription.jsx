/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { subscribeToNeighborhood } from "../services/subscriptions";
import { neighborhoodsInSofia } from "../assets/data/data";
import SubscriptionsTable from "./SubscriptionsTable";
import { useSubscriptions } from "../hooks/subscriptions";
import Message from "../components/UI/Message";

const ManageSubscriptions = ({ userId }) => {
  const [neighborhood, setNeighborhood] = useState("");
  const [message, setMessage] = useState("");
  const { refetch, subscriptions } = useSubscriptions(userId);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const subscribedNeighborhoods = subscriptions.map(
    (sub) => sub.neighborhoodName
  );

  const availableNeighborhoods = neighborhoodsInSofia.filter(
    (n) => !subscribedNeighborhoods.includes(n)
  );

  const handleSubscribe = async () => {
    if (!neighborhood) {
      setMessage("Please choose a neighborhood.");
      return;
    }

    try {
      await subscribeToNeighborhood(userId, neighborhood);

      setMessage("Successfully subscribed!");
      setTimeout(() => setMessage(""), 3000);
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
            {availableNeighborhoods.map((n) => (
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
        {message && <Message message={message} />}
      </div>
      <SubscriptionsTable userId={userId} />
    </>
  );
};

export default ManageSubscriptions;
