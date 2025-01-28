/* eslint-disable react/prop-types */
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MapEvents from "./MapEvents";

const MapSection = ({ coordinates, handleMapClick }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700">
        Select Location on Map:
      </h3>
      <div className="h-80 w-full rounded-md shadow-md mt-3 overflow-hidden">
        <MapContainer
          center={
            coordinates?.lat && coordinates?.lng
              ? [coordinates?.lat, coordinates?.lng]
              : [42.698334, 23.319941]
          }
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {coordinates.lat && coordinates.lng && (
            <Marker position={[coordinates.lat, coordinates.lng]}>
              <Popup>You selected this location.</Popup>
            </Marker>
          )}
          <MapEvents onClick={handleMapClick} />
        </MapContainer>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Click on the map to select a location. Selected coordinates will appear
        in the form.
      </p>
    </div>
  );
};

export default MapSection;
