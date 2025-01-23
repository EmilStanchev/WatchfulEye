/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getIncidentById, updateIncident } from "../services/incidents";

const LocationPicker = ({ setCoordinates }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setCoordinates({ lat, lng });
    },
  });
  return null;
};

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
        console.log(err);
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

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      return data?.display_name || "Address not found";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Error fetching address";
    }
  };
  const fetchNeighborhood = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();

      // Extract the neighborhood
      const address = data.address;
      let neighborhood =
        address.neighbourhood || address.suburb || address.city_district;

      // Fallback if neighborhood is not available
      if (!neighborhood) {
        neighborhood = "Unknown Neighborhood";
      }
      return neighborhood;
    } catch (error) {
      console.error("Error fetching neighborhood:", error);
      return "Error fetching neighborhood";
    }
  };
  const setCoordinates = async ({ lat, lng }) => {
    try {
      const address = await fetchAddress(lat, lng);
      const currentNeighborhood = await fetchNeighborhood(lat, lng);
      setFormData((prev) => ({
        ...prev,
        coordinates: { lat, lng },
        address: address,
        neighborhood: currentNeighborhood,
      }));
    } catch (error) {
      console.error("Error setting coordinates:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateIncident(id, {
        ...formData,
        coordinates: formData.coordinates,
      });
      navigate("/myReports");
    } catch (err) {
      setError("Failed to update incident");
      console.log(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-xl  mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Location on Map
          </label>
          <MapContainer
            center={[formData.coordinates.lat, formData.coordinates.lng]}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationPicker setCoordinates={setCoordinates} />
            <Marker
              position={[formData.coordinates.lat, formData.coordinates.lng]}
            ></Marker>
          </MapContainer>
        </div>
        <div>
          <p>
            <strong>Latitude:</strong> {formData.coordinates.lat}{" "}
            <strong>Longitude:</strong> {formData.coordinates.lng}
          </p>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditIncident;
