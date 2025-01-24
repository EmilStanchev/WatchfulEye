/* eslint-disable react/prop-types */
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
};

const MapPicker = ({ coordinates, onMapClick }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Map</label>
    <MapContainer
      center={[42.698334, 23.319941]}
      zoom={10}
      scrollWheelZoom={false}
      className="w-full h-64 rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler onMapClick={onMapClick} />
      {coordinates.lat && coordinates.lng && (
        <Marker position={[coordinates.lat, coordinates.lng]}>
          <Popup>Incident Location</Popup>
        </Marker>
      )}
    </MapContainer>
  </div>
);

export default MapPicker;
