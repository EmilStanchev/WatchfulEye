import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getIncidentById } from "../services/incidents";
import CustomSpinner from "../components/reusable/CustomSpinner";
import EditIncidentForm from "../components/forms/EditIncidentForm";

const EditIncident = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [incidentData, setIncidentData] = useState(null);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const data = await getIncidentById(id);
        setIncidentData(data);
      } catch (err) {
        setError("Failed to load incident data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id]);

  if (loading) return <CustomSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-white bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Edit Incident</h2>
      <EditIncidentForm
        initialData={incidentData}
        onSuccess={() => navigate("/myReports")}
      />
    </div>
  );
};

export default EditIncident;
