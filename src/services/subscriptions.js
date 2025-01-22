import { db } from "../../FirebaseConfig"; // Your Firebase configuration
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

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
    console.log(userId);

    // Get all subscriptions for the user
    const subscriptionRef = collection(db, "subscriptions");
    const q = query(subscriptionRef, where("userId", "==", userId));
    const subscriptionSnapshot = await getDocs(q);

    // Extract valid neighborhood names
    const neighborhoods = subscriptionSnapshot.docs
      .map((doc) => doc.data()?.neighborhoodName)
      .filter(
        (neighborhood) => neighborhood !== undefined && neighborhood !== null
      );

    if (neighborhoods.length === 0) {
      // Return an empty array if no neighborhoods are subscribed to
      return [];
    }
    neighborhoods?.map((neighborhood) => {
      console.log(neighborhood);
    });
    // Fetch incidents for these neighborhoods
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
