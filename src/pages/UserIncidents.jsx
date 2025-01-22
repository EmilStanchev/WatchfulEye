/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useUserIncidents } from "../hooks/incidents";
import { deleteIncident } from "../services/incidents";
import ConfirmationModal from "../components/reusable/ConfirmationModal"; // Import the modal

const UserIncidents = ({ userEmail }) => {
  const { incidents, error, refetchIncidents } = useUserIncidents(userEmail);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incidentToDelete, setIncidentToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const onDeleteIncident = (id) => {
    console.log(id);
    deleteIncident(id);
    refetchIncidents();
    setSuccessMessage("Incident deleted successfully!");
    setTimeout(() => setSuccessMessage(""), 3000); // Hide message after 3 seconds
    setIsModalOpen(false); // Close the modal
  };

  const handleDeleteClick = (id) => {
    setIncidentToDelete(id);
    setIsModalOpen(true); // Show confirmation modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (error) {
    return (
      <div className="text-center text-red-500 mt-6">
        An error occurred while fetching incidents. Please try again later.
      </div>
    );
  }

  if (!incidents || incidents.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-6">
        No incidents reported yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white rounded-lg shadow-md border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="text-left px-6 py-4 font-medium text-gray-600">
              Title
            </th>
            <th className="text-left px-6 py-4 font-medium text-gray-600">
              Description
            </th>
            <th className="text-left px-6 py-4 font-medium text-gray-600">
              Date
            </th>
            <th className="text-left px-6 py-4 font-medium text-gray-600">
              Address
            </th>
            <th className="text-center px-6 py-4 font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr
              key={incident.id}
              className="border-b hover:bg-gray-50 transition duration-200"
            >
              <td className="px-6 py-4 text-gray-700">{incident.title}</td>
              <td className="px-6 py-4 text-gray-500">
                {incident.description}
              </td>
              <td className="px-6 py-4 text-gray-500">
                {new Date(incident?.createdAt * 1000).toUTCString()}
              </td>
              <td className="px-6 py-4 text-gray-500">{incident?.address}</td>
              <td className="px-6 py-4 text-center space-x-4">
                {/* Edit Button */}
                <button
                  className="text-blue-500 hover:text-blue-700 transition duration-150"
                  title="Edit Incident"
                >
                  <FaEdit size={18} />
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteClick(incident?.id)}
                  className="text-red-500 hover:text-red-700 transition duration-150"
                  title="Delete Incident"
                >
                  <FaTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={() => onDeleteIncident(incidentToDelete)}
        message="Are you sure you want to delete this incident?"
      />

      {/* Success Message */}
      {successMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default UserIncidents;
