import { Routes, Route } from "react-router-dom";
import MapComponent from "../components/reusable/MapContainer";
import AddIncidentForm from "../components/forms/AddIncidents";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MapComponent />} />
      <Route path="/addIncident" element={<AddIncidentForm />} />
    </Routes>
  );
};

export default AppRouter;
