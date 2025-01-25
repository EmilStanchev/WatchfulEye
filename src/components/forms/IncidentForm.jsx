/* eslint-disable react/prop-types */
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import MapSection from "../reusable/Map/MapSections";
import { ImageList } from "../reusable/Map/ImageList";
import {
  fetchAddress,
  fetchNeighborhood,
} from "../../services/helpers/locationService";

export const IncidentForm = ({ onSubmit, isSubmitting }) => {
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [imageUrls, setImageUrls] = useState([]);
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, "Title must be 100 characters or less")
        .required("Title is required"),
      description: Yup.string()
        .max(500, "Description must be 500 characters or less")
        .required("Description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formValues = {
        ...values,
        address,
        neighborhood,
        images: imageUrls,
        coordinates,
      };

      await onSubmit(formValues, resetForm);
      setImageUrls([]);
      setCoordinates({ lat: "", lng: "" });
      setAddress("");
      setNeighborhood("");
    },
  });

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    setCoordinates({ lat, lng });

    try {
      const fetchedAddress = await fetchAddress(lat, lng);
      const fetchedNeighborhood = await fetchNeighborhood(lat, lng);

      setAddress(fetchedAddress);
      setNeighborhood(fetchedNeighborhood);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const handleAddImage = () => {
    if (currentImageUrl.trim()) {
      setImageUrls((prevUrls) => [...prevUrls, currentImageUrl.trim()]);
      setCurrentImageUrl("");
    }
  };

  const removeImageUrl = (url) => {
    setImageUrls(imageUrls.filter((imageUrl) => imageUrl !== url));
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-gray-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          className="w-full border rounded-md p-2"
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-red-500 text-sm">{formik.errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          className="w-full border rounded-md p-2"
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-sm">{formik.errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="images" className="block text-gray-700">
          Add Image URL
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={currentImageUrl}
            onChange={(e) => setCurrentImageUrl(e.target.value)}
            className="w-full border rounded-md p-2"
            placeholder="Enter image URL"
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Image
          </button>
        </div>
      </div>

      <ImageList imageUrls={imageUrls} removeImageUrl={removeImageUrl} />

      <MapSection coordinates={coordinates} handleMapClick={handleMapClick} />

      <p className="text-gray-600 text-sm">
        Selected Location: {address || "No location selected"}
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
      >
        {isSubmitting ? "Submitting..." : "Submit Incident"}
      </button>
    </form>
  );
};
