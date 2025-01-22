import { db } from "../../FirebaseConfig"; // Your Firebase configuration
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const subscribeToNeighborhood = async (userId, neighborhoodName) => {
  try {
    const subscriptionRef = collection(db, "subscriptions");
    await addDoc(subscriptionRef, {
      userId,
      neighborhoodName,
      createdAt: new Date(),
    });
    return {
      success: true,
      message: "Successfully subscribed to the neighborhood.",
    };
  } catch (error) {
    console.error("Error subscribing to neighborhood:", error);
    throw new Error("Failed to subscribe.");
  }
};

export const fetchSubscribedIncidents = async (userId) => {
  try {
    const subscriptionRef = collection(db, "subscriptions");
    const q = query(subscriptionRef, where("userId", "==", userId));
    const subscriptionSnapshot = await getDocs(q);

    const neighborhoods = subscriptionSnapshot.docs
      .map((doc) => doc.data()?.neighborhoodName)
      .filter(
        (neighborhood) => neighborhood !== undefined && neighborhood !== null
      );

    if (neighborhoods.length === 0) {
      return [];
    }
    const incidentsRef = collection(db, "incidents");
    const incidentQuery = query(
      incidentsRef,
      where("neighborhood", "in", neighborhoods)
    );
    const incidentSnapshot = await getDocs(incidentQuery);

    return incidentSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching subscribed incidents:", error);
    throw new Error("Failed to fetch subscribed incidents.");
  }
};

export const getUserSubscriptions = async (userId) => {
  const subscriptionsRef = collection(db, "subscriptions");
  const querySnapshot = await getDocs(subscriptionsRef);
  return querySnapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((sub) => sub.userId === userId); // Filter by userId
};

// Unsubscribe from a neighborhood
export const unsubscribeFromNeighborhood = async (subscriptionId) => {
  const subscriptionRef = doc(db, "subscriptions", subscriptionId);
  await deleteDoc(subscriptionRef);
};
