import { MapContainer, Marker, TileLayer } from "react-leaflet";
import LocationPicker from "../reusable/Map/MapPicker";

/* eslint-disable react/prop-types */
const IncidentForm = ({
  formData,
  handleChange,
  handleSubmit,
  setCoordinates,
}) => (
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
        />
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
);

export default IncidentForm;
