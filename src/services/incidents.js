// firebaseService.js
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
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
    return data;
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return [];
  }
};
const addIncident = async (incident) => {
  try {
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
  } catch (error) {
    console.error("Error deleting incident:", error);
    throw new Error("Failed to delete incident.");
  }
};
const getIncidentById = async (id) => {
  const incidentDoc = doc(db, "incidents", id);
  const incidentSnapshot = await getDoc(incidentDoc);
  if (incidentSnapshot.exists()) {
    return { id: incidentSnapshot.id, ...incidentSnapshot.data() };
  } else {
    throw new Error("Incident not found");
  }
};

// Update an incident
const updateIncident = async (id, updatedData) => {
  const incidentDoc = doc(db, "incidents", id);
  await updateDoc(incidentDoc, updatedData);
};

export {
  getIncidents,
  addIncident,
  getIncidentsForUser,
  deleteIncident,
  getIncidentById,
  updateIncident,
};
