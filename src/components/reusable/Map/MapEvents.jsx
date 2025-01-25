/* eslint-disable react/prop-types */
import { useMapEvents } from "react-leaflet";

const MapEvents = ({ onClick }) => {
  useMapEvents({
    click: (e) => onClick(e),
  });
  return null;
};
export default MapEvents;
