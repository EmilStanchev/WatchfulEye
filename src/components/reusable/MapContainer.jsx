// MapComponent.js

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "./Modal";
import useIncidents from "../../hooks/useIncidents";

const MapComponent = () => {
  const { incidents = [], loading, error } = useIncidents();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading incidents: {error.message}</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <MapContainer
        center={[42.66291, 23.37234]}
        zoom={15}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {incidents.map((incident) => (
          <CircleMarker
            key={incident.id}
            center={[
              incident.coordinates._lat
                ? incident.coordinates._lat
                : incident.coordinates.lat,
              incident.coordinates._long
                ? incident.coordinates._long
                : incident.coordinates.lng,
            ]}
            radius={5}
            fillOpacity={0.5}
          >
            <Tooltip>{incident?.title}</Tooltip>
            <Popup>
              <Modal incident={incident} />
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
