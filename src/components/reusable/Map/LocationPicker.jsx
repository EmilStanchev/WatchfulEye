/* eslint-disable react/prop-types */
import { useMapEvents } from "react-leaflet";

const LocationPicker = ({ setCoordinates }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setCoordinates({ lat, lng });
    },
  });

  return null;
};

export default LocationPicker;
