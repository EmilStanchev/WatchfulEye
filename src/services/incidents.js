// firebaseService.js
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { v4 as uuidv4 } from "uuid";
const incidentsCollection = collection(db, "incidents");

const getIncidents = async () => {
  try {
    const response = await getDocs(incidentsCollection);

    const data = response.docs.map((document) => ({
      ...document.data(),
      id: document.id,
    }));
    console.log(data, "data from service");
    return data;
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return [];
  }
};
const addIncident = async (incident) => {
  try {
    console.log(incident, "from service");
    await setDoc(doc(db, "incidents", uuidv4()), incident);
  } catch (error) {
    console.error("Error adding incident:", error);
    throw new Error("Failed to add incident. Please try again.");
  }
};
const getIncidentsForUser = async (userEmail) => {
  try {
    const response = await getDocs(incidentsCollection);

    const data = response.docs
      .map((document) => ({
        ...document.data(),
        id: document.id,
      }))
      .filter((incident) => incident.createdBy === userEmail); // Filter for current user

    console.log(data, "data for user from service");
    return data;
  } catch (error) {
    console.error("Error fetching user incidents:", error);
    return [];
  }
};

const deleteIncident = async (incidentId) => {
  try {
    const incidentDoc = doc(db, "incidents", incidentId);
    await deleteDoc(incidentDoc);
    console.log("Incident successfully deleted:", incidentId);
  } catch (error) {
    console.error("Error deleting incident:", error);
    throw new Error("Failed to delete incident.");
  }
};

export { getIncidents, addIncident, getIncidentsForUser, deleteIncident };
