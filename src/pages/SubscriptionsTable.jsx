/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FiTrash2 } from "react-icons/fi";
import { useSubscriptions } from "../hooks/subscriptions";
import { useState } from "react";
import ConfirmationModal from "../components/reusable/ConfirmationModal";
import CustomSpinner from "../components/reusable/CustomSpinner";

const SubscriptionsList = ({ userId }) => {
  const { subscriptions, loading, error, unsubscribe } =
    useSubscriptions(userId);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubId, setSelectedSubId] = useState(null);

  const openModal = (subId) => {
    setSelectedSubId(subId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSubId(null);
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await unsubscribe(selectedSubId);
      setMessage("Incident deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Failed to unsubscribe. Please try again.");
    } finally {
      closeModal();
    }
  };

  if (loading) return <CustomSpinner />;
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
            className="bg-white shadow-lg rounded-xl p-6 transform transition-transform hover:scale-105 hover:shadow-2xl"
          >
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
              Subscribed on:{" "}
              <span className="text-gray-400">
                {new Date(sub?.createdAt?.seconds * 1000).toLocaleDateString()}
              </span>
            </p>
          </div>
        ))}
      </div>
      {message && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-lg shadow-md text-center transition-opacity duration-300 ease-in-out">
          {message}
        </div>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to unsubscribe? This action cannot be undone."
      />
    </div>
  );
};

export default SubscriptionsList;
