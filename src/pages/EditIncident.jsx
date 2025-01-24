import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { getIncidentById, updateIncident } from "../services/incidents";
import {
  fetchAddress,
  fetchNeighborhood,
} from "../services/helpers/locationService";
import IncidentForm from "../components/forms/EditIncidentForm";
import CustomSpinner from "../components/reusable/CustomSpinner";

const EditIncident = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    coordinates: { lat: null, lng: null },
    neighborhood: "",
  });

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const data = await getIncidentById(id);
        setFormData({
          title: data.title,
          description: data.description,
          address: data.address,
          coordinates: data.coordinates || { lat: 51.505, lng: -0.09 },
          neighborhood: data.neighborhood,
        });
      } catch (err) {
        setError("Failed to load incident data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setCoordinates = async ({ lat, lng }) => {
    try {
      const address = await fetchAddress(lat, lng);
      const neighborhood = await fetchNeighborhood(lat, lng);
      setFormData((prev) => ({
        ...prev,
        coordinates: { lat, lng },
        address,
        neighborhood,
      }));
    } catch (error) {
      console.error("Error setting coordinates:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateIncident(id, formData);
      navigate("/myReports");
    } catch (err) {
      setError("Failed to update incident");
      console.error(err);
    }
  };

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
      <IncidentForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        setCoordinates={setCoordinates}
      />
    </div>
  );
};

export default EditIncident;
