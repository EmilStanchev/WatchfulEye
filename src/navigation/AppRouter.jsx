/* eslint-disable react/prop-types */
import { Routes, Route, Navigate } from "react-router-dom";
import MapComponent from "../components/reusable/MapContainer";
import AddIncidentForm from "../components/forms/AddIncidents";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import UserIncidents from "../pages/UserIncidents";
import About from "../pages/About";
import EditIncident from "../pages/EditIncident";
import ManageSubscriptions from "../pages/ManageSubscription";
import SubscribedIncidents from "../pages/SubscribedIncidents";

const AppRouter = ({ user }) => {
  return (
    <Routes>
      <Route path="/" element={user ? <MapComponent /> : <About />} />
      <Route path="/addIncident" element={<AddIncidentForm />} />
      <Route
        path="/myReports"
        element={user ? <UserIncidents userEmail={user?.email} /> : <Login />}
      />
      <Route path="/edit-incident/:id" element={<EditIncident />} />
      <Route
        path="/subscribeToNeighbor"
        element={user ? <ManageSubscriptions userId={user?.uid} /> : <Login />}
      />{" "}
      <Route
        path="/subscribedIncidents"
        element={user ? <SubscribedIncidents userId={user?.uid} /> : <Login />}
      />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      />
    </Routes>
  );
};

export default AppRouter;
