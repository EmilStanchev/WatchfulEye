import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "./Modal";
import { useIncidents } from "../../hooks/incidents";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import TooltipButton from "../UI/TooltipButton";

const MapComponent = () => {
  const { incidents = [], loading, error } = useIncidents();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading incidents: {error.message}</div>;
  }

  return (
    <div className=" w-full flex flex-col ">
      <div className="absolute bottom-10 right-10 z-50">
        <Link
          to="/addIncident"
          aria-placeholder="Add incident"
          className="w-16 h-16 bg-blue-600 text-black rounded-full shadow-xl flex justify-center items-center hover:bg-blue-700 active:scale-95 transition-all duration-300"
          aria-label="Add Incident"
        >
          <FaPlus className="h-8 w-8" />
          <TooltipButton
            tooltipText="Add New Incident"
            icon={FaPlus}
            onClick={() => console.log("Button clicked!")}
          />
        </Link>
      </div>
      <MapContainer
        center={[42.66291, 23.37234]}
        zoom={15}
        className="h-screen lg:h-[92%]  w-full absolute z-20"
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
