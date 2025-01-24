/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FiTrash2 } from "react-icons/fi";
import { useSubscriptions } from "../hooks/subscriptions";
import { useState } from "react";
import ConfirmationModal from "../components/reusable/ConfirmationModal";
import CustomSpinner from "../components/reusable/CustomSpinner";
import Message from "../components/UI/Message.jsx";
import SubscriptionCard from "../components/UI/cards/SubscriptionCard.jsx";
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
          <SubscriptionCard key={sub?.id} sub={sub} openModal={openModal} />
        ))}
      </div>
      {message && <Message message={message} />}
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
