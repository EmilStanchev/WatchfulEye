import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import incidents from "../../assets/data/data";
import Modal from "./Modal";

const MapComponent = () => {
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
            center={[incident.coordinates.lat, incident.coordinates.lng]}
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
