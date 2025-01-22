import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addIncident } from "../../services/incidents";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { FaTimesCircle } from "react-icons/fa";
import { auth } from "../../../FirebaseConfig";

const AddIncident = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [imageUrls, setImageUrls] = useState([]);
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const user = auth?.currentUser;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      coordinates: {
        lat: coordinates.lat,
        lng: coordinates.lng,
      },
      images: imageUrls,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, "Title must be 100 characters or less")
        .required("Title is required"),
      description: Yup.string()
        .max(500, "Description must be 500 characters or less")
        .required("Description is required"),
      coordinates: Yup.object({
        lat: Yup.number()
          .required("Latitude is required")
          .min(-90, "Latitude must be between -90 and 90")
          .max(90, "Latitude must be between -90 and 90"),
        lng: Yup.number()
          .required("Longitude is required")
          .min(-180, "Longitude must be between -180 and 180")
          .max(180, "Longitude must be between -180 and 180"),
      }),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setMessage(null);

      try {
        const newIncident = {
          title: values.title,
          description: values.description,
          address: address,
          coordinates: values.coordinates,
          images: imageUrls,
          createdAt: Date.now(),
          createdBy: user?.email,
          neighborhood: neighborhood,
        };
        console.log(newIncident);

        await addIncident(newIncident);

        setMessage({ type: "success", text: "Incident added successfully!" });
        resetForm();
        setImageUrls([]);
        setAddress("");
        setNeighborhood("");
      } catch (error) {
        setMessage({ type: "error", text: error.message });
      } finally {
        setIsSubmitting(false);
      }
    },
  });
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
      setNeighborhood(neighborhood);
      return neighborhood;
    } catch (error) {
      console.error("Error fetching neighborhood:", error);
      return "Error fetching neighborhood";
    }
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setCoordinates({ lat, lng });
    formik.setFieldValue("coordinates.lat", lat);
    formik.setFieldValue("coordinates.lng", lng);

    fetchAddress(lat, lng);
    fetchNeighborhood(lat, lng);
  };

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      setAddress(data.display_name); // Set the address from the API response
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  const handleImageUrlChange = (e) => {
    const value = e.target.value;
    if (value) {
      setImageUrls((prevUrls) => [...prevUrls, value]);
    }
  };

  const removeImageUrl = (url) => {
    setImageUrls(imageUrls.filter((imageUrl) => imageUrl !== url));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8 space-y-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Add New Incident
        </h1>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Incident Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-xs mt-2">{formik.errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Incident Description
            </label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-xs mt-2">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Address (automatically fetched from map) */}
          {address && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={address}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Image URLs
            </label>
            <input
              type="text"
              id="images"
              placeholder="Enter Image URL"
              onBlur={formik.handleBlur}
              onChange={handleImageUrlChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter image URLs, one per line.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700">
              Added Images:
            </h3>
            <ul className="list-disc pl-5">
              {imageUrls.map((url, index) => (
                <li key={index} className="flex justify-between items-center">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 truncate"
                  >
                    {url}
                  </a>
                  <button
                    type="button"
                    onClick={() => removeImageUrl(url)}
                    className="ml-2 text-red-500"
                  >
                    <FaTimesCircle />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Map
            </label>
            <MapContainer
              center={[42.698334, 23.319941]}
              zoom={10}
              scrollWheelZoom={false}
              className="w-full h-64 rounded-lg"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapClickHandler />
              {coordinates.lat && coordinates.lng && (
                <Marker position={[coordinates.lat, coordinates.lng]}>
                  <Popup>Incident Location</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
            >
              {isSubmitting ? "Submitting..." : "Submit Incident"}
            </button>
          </div>
        </form>
        {message && (
          <p
            className={`text-center text-sm font-medium mb-4 ${
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
