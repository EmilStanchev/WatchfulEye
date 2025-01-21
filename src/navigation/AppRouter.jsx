/* eslint-disable react/prop-types */
import { Routes, Route, Navigate } from "react-router-dom";
import MapComponent from "../components/reusable/MapContainer";
import AddIncidentForm from "../components/forms/AddIncidents";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import UserIncidents from "../pages/UserIncidents";
import About from "../pages/About";

const AppRouter = ({ user }) => {
  console.log(user);

  return (
    <Routes>
      <Route path="/" element={user ? <MapComponent /> : <Login />} />
      <Route path="/addIncident" element={<AddIncidentForm />} />
      <Route
        path="/myReports"
        element={user ? <UserIncidents userEmail={user?.email} /> : <Login />}
      />
      <Route path="/about" element={user ? <About /> : <Login />} />

      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      />
    </Routes>
  );
};

export default AppRouter;
