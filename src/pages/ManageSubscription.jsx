/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { subscribeToNeighborhood } from "../services/subscriptions";
import { neighborhoodsInSofia } from "../assets/data/data";
import SubscriptionsTable from "./SubscriptionsTable";

const ManageSubscriptions = ({ userId }) => {
  const [neighborhood, setNeighborhood] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!neighborhood) {
      setMessage("Моля, изберете квартал.");
      return;
    }

    try {
      const response = await subscribeToNeighborhood(userId, neighborhood);
      setMessage(response.message || "Успешно се абонирахте!");
      setNeighborhood(""); // Clear selected neighborhood
    } catch (error) {
      setMessage("Неуспешен опит за абонамент. Опитайте отново по-късно.");
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Manage your neighborhoods</h2>
        <select
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="" disabled className="text-center">
            Choose neighborhood
          </option>
          {neighborhoodsInSofia.map((n) => (
            <option key={n} value={n} className="text-center">
              {n}
            </option>
          ))}
        </select>
        <button
          onClick={handleSubscribe}
          className="bg-blue-500 text-white text-xl px-4 py-2 rounded text-center hover:bg-blue-600  "
        >
          Subscribe
        </button>
        {message && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
            {message}
          </div>
        )}
      </div>
      <SubscriptionsTable userId={userId} />
    </>
  );
};

export default ManageSubscriptions;
