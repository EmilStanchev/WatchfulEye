import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addIncident } from "../../services/incidents"; // Import your custom service function
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

const AddIncident = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [imageUrls, setImageUrls] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      address: "",
      coordinates: {
        lat: coordinates.lat,
        lng: coordinates.lng,
      },
      images: imageUrls, // For the image URLs
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, "Title must be 100 characters or less")
        .required("Title is required"),
      description: Yup.string()
        .max(500, "Description must be 500 characters or less")
        .required("Description is required"),
      address: Yup.string()
        .max(200, "Address must be 200 characters or less")
        .required("Address is required"),
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
        // Use the addIncident function to save the incident to Firestore
        const newIncident = {
          title: values.title,
          description: values.description,
          address: values.address,
          coordinates: values.coordinates,
          images: imageUrls, // Store image URLs in the incident document
        };

        await addIncident(newIncident);

        setMessage({ type: "success", text: "Incident added successfully!" });
        resetForm();
        setImageUrls([]); // Clear image URLs state
      } catch (error) {
        setMessage({ type: "error", text: error.message });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Handle map click and update coordinates
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setCoordinates({ lat, lng });
    formik.setFieldValue("coordinates.lat", lat);
    formik.setFieldValue("coordinates.lng", lng);
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  // Handle input for image URLs
  const handleImageUrlChange = (e) => {
    const value = e.target.value;
    if (value) {
      setImageUrls((prevUrls) => [...prevUrls, value]);
    }
  };

  // Handle removing an image URL
  const removeImageUrl = (url) => {
    setImageUrls(imageUrls.filter((imageUrl) => imageUrl !== url));
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-xl font-bold mb-4">Add Incident</h1>
      {message && (
        <p
          className={`mb-4 text-sm ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
      <form onSubmit={formik.handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {formik.touched.title && formik.errors.title ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          ) : null}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {formik.touched.description && formik.errors.description ? (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </p>
          ) : null}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {formik.touched.address && formik.errors.address ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
          ) : null}
        </div>

        {/* Image URLs */}
        <div className="mb-4">
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter image URLs, one per line.
          </p>
        </div>

        {/* Display added URLs */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700">Added Images:</h3>
          <ul className="list-disc pl-5">
            {imageUrls.map((url, index) => (
              <li key={index} className="flex justify-between items-center">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {url}
                </a>
                <button
                  type="button"
                  onClick={() => removeImageUrl(url)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Map */}
        <div className="mb-4">
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

        {/* Submit */}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
          >
            {isSubmitting ? "Submitting..." : "Add Incident"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIncident;
