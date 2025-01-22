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
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">
          Управление на абонаменти по квартали
        </h2>
        <select
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="" disabled>
            Изберете квартал
          </option>
          {neighborhoodsInSofia.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <button
          onClick={handleSubscribe}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Абонирай се
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
