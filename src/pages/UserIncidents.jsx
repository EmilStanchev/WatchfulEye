/* eslint-disable react/prop-types */
import { useState } from "react";
import { useIncidents, useUserIncidents } from "../hooks/incidents";
import { deleteIncident } from "../services/incidents";
import ConfirmationModal from "../components/reusable/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import UserMetrics from "../components/UI/User/UserMetrics"; // Import the new Metrics component
import CustomSpinner from "../components/reusable/CustomSpinner";
import { useSubscriptions } from "../hooks/subscriptions";
import IncidentsTable from "../components/UI/User/IncidentsTable";
import Message from "../components/UI/Message";

const UserIncidents = ({ user }) => {
  const { incidents, error, refetchIncidents, loading } = useUserIncidents(
    user?.email
  );
  const { incidents: totalIncidents } = useIncidents();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incidentToDelete, setIncidentToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { subscriptions } = useSubscriptions(user?.uid);

  const userIncidentsCount = incidents?.length || 0;
  const navigate = useNavigate();

  const handleEditClick = (id) => {
    navigate(`/edit-incident/${id}`);
  };

  const onDeleteIncident = (id) => {
    deleteIncident(id);
    refetchIncidents();
    setSuccessMessage("Incident deleted successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
    setIsModalOpen(false);
  };

  const handleDeleteClick = (id) => {
    setIncidentToDelete(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <CustomSpinner />;
  }
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
    <div className="p-6 space-y-6">
      <UserMetrics
        userIncidentsCount={userIncidentsCount}
        totalIncidentsCount={totalIncidents?.length}
        userNeighborhoods={subscriptions?.length}
        incidents={incidents}
      />
      <IncidentsTable
        incidents={incidents}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
      />

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={() => onDeleteIncident(incidentToDelete)}
        message="Are you sure you want to delete this incident?"
      />

      {successMessage && <Message message={successMessage} />}
    </div>
  );
};

export default UserIncidents;
