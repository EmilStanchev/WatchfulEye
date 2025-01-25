/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateIncident } from "../../services/incidents";
import {
  fetchAddress,
  fetchNeighborhood,
} from "../../services/helpers/locationService";
import MapSection from "../reusable/Map/MapSections";

const EditIncidentForm = ({ initialData, onSuccess }) => {
  const formik = useFormik({
    initialValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      address: initialData?.address || "",
      coordinates: initialData?.coordinates || { lat: 51.505, lng: -0.09 },
      neighborhood: initialData?.neighborhood || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: async (values) => {
      try {
        await updateIncident(initialData.id, values);
        onSuccess();
      } catch (err) {
        console.error("Failed to update incident:", err);
      }
    },
  });

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;

    try {
      const address = await fetchAddress(lat, lng);
      const neighborhood = await fetchNeighborhood(lat, lng);
      formik.setFieldValue("coordinates", { lat, lng });
      formik.setFieldValue("address", address);
      formik.setFieldValue("neighborhood", neighborhood);
    } catch (error) {
      console.error("Error setting coordinates:", error);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-2 border rounded ${
            formik.touched.title && formik.errors.title ? "border-red-500" : ""
          }`}
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-red-500 text-sm">{formik.errors.title}</div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-2 border rounded ${
            formik.touched.description && formik.errors.description
              ? "border-red-500"
              : ""
          }`}
        ></textarea>
        {formik.touched.description && formik.errors.description && (
          <div className="text-red-500 text-sm">
            {formik.errors.description}
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Address</label>
        <input
          type="text"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-2 border rounded ${
            formik.touched.address && formik.errors.address
              ? "border-red-500"
              : ""
          }`}
        />
        {formik.touched.address && formik.errors.address && (
          <div className="text-red-500 text-sm">{formik.errors.address}</div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Select Location on Map
        </label>
        <MapSection
          coordinates={formik.values.coordinates}
          handleMapClick={handleMapClick}
        />
      </div>
      <div>
        <p>
          <strong>Latitude:</strong> {formik.values.coordinates.lat}{" "}
          <strong>Longitude:</strong> {formik.values.coordinates.lng}
        </p>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditIncidentForm;
