import { useFormik } from "formik";
import MapPicker from "../reusable/Map/MapPicker";
import AddressField from "../UI/incidents/AddressField";
import ImageUploader from "../UI/incidents/ImageUploader";
import * as Yup from "yup";

/* eslint-disable react/prop-types */
const IncidentForm = ({
  onSubmit,
  coordinates,
  address,
  neighborhood,
  imageUrls,
  onAddImage,
  onRemoveImage,
  onMapClick,
}) => {
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
    onSubmit: (values) => {
      onSubmit({
        ...values,
        coordinates,
        address,
        neighborhood,
        images: imageUrls,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Incident Title
        </label>
        <input
          name="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-red-500 text-xs mt-2">{formik.errors.title}</p>
        )}
      </div>
      {/* Description */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Incident Description
        </label>
        <textarea
          name="description"
          rows="4"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-xs mt-2">
            {formik.errors.description}
          </p>
        )}
      </div>

      <ImageUploader
        imageUrls={imageUrls}
        onAddImage={onAddImage}
        onRemoveImage={onRemoveImage}
      />

      <MapPicker coordinates={coordinates} onMapClick={onMapClick} />
      <AddressField address={address} />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Submit Incident
      </button>
    </form>
  );
};
export default IncidentForm;
