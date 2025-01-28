import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";

export const notifySubscribers = async (
  neighborhoodName,
  message,
  creatorUserId
) => {
  try {
    const subscriptionsRef = collection(db, "subscriptions");
    const q = query(
      subscriptionsRef,
      where("neighborhoodName", "==", neighborhoodName)
    );
    const subscriptionSnapshots = await getDocs(q);

    const subscribedUserIds = subscriptionSnapshots.docs
      .map((doc) => doc.data().userId)
      .filter((userId) => userId !== creatorUserId);

    const notificationsRef = collection(db, "notifications");
    const createNotificationPromises = subscribedUserIds.map((userId) =>
      addDoc(notificationsRef, {
        userId,
        message,
        timestamp: Date.now(),
      })
    );

    await Promise.all(createNotificationPromises);

    console.log(
      "Notifications sent to all subscribed users except the creator."
    );
  } catch (error) {
    console.error("Failed to notify subscribers:", error);
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const notificationRef = doc(db, "notifications", notificationId);
    await deleteDoc(notificationRef);
    console.log(`Notification ${notificationId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting notification:", error);
  }
};

export const fetchUserNotifications = async (userId) => {
  try {
    const notificationsRef = collection(db, "notifications");

    const response = await getDocs(notificationsRef);

    const data = response.docs
      .map((document) => ({
        ...document.data(),
        id: document.id,
      }))
      .filter((notification) => notification?.userId === userId); // Filter for current user

    return data;
  } catch (error) {
    console.error("Error fetching user incidents:", error);
    return [];
  }
};
