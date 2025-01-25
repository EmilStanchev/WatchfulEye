import { useState } from "react";
import { auth } from "../../../FirebaseConfig";
import { addIncident } from "../../services/incidents";
import { IncidentForm } from "./IncidentForm";

const AddIncident = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const user = auth?.currentUser;

  const handleFormSubmit = async (formValues, resetForm) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const newIncident = {
        ...formValues,
        createdAt: Date.now(),
        createdBy: { userName: user?.displayName, email: user?.email },
      };

      await addIncident(newIncident);

      setMessage({ type: "success", text: "Incident added successfully!" });
      resetForm();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8 space-y-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Add New Incident
        </h1>

        <IncidentForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />

        {message && (
          <p
            className={`text-center text-sm font-medium mt-4 ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddIncident;
