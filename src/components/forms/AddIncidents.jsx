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
  const user = auth?.currentUser;
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      address: "",
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
        const newIncident = {
          title: values.title,
          description: values.description,
          address: values.address,
          coordinates: values.coordinates,
          images: imageUrls,
          createdAt: Date.now(),
          createdBy: user?.email,
        };
        console.log(newIncident);

        await addIncident(newIncident);

        setMessage({ type: "success", text: "Incident added successfully!" });
        resetForm();
        setImageUrls([]);
      } catch (error) {
        setMessage({ type: "error", text: error.message });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

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
        {message && (
          <p
            className={`text-center text-sm font-medium mb-4 ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.title}
                </p>
              )}
            </div>
            <div>
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.address}
                </p>
              )}
            </div>
          </div>

          <div>
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="coordinates.lat"
                className="block text-sm font-medium text-gray-700"
              >
                Latitude
              </label>
              <input
                id="coordinates.lat"
                name="coordinates.lat"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.coordinates.lat}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {formik.touched.coordinates?.lat &&
                formik.errors.coordinates?.lat && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.coordinates.lat}
                  </p>
                )}
            </div>
            <div>
              <label
                htmlFor="coordinates.lng"
                className="block text-sm font-medium text-gray-700"
              >
                Longitude
              </label>
              <input
                id="coordinates.lng"
                name="coordinates.lng"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.coordinates.lng}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {formik.touched.coordinates?.lng &&
                formik.errors.coordinates?.lng && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.coordinates.lng}
                  </p>
                )}
            </div>
          </div>

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
              {isSubmitting ? "Submitting..." : "Add Incident"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncident;
