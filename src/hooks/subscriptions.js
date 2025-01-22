/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  fetchSubscribedIncidents,
  getUserSubscriptions,
  unsubscribeFromNeighborhood,
} from "../services/subscriptions";

export const useSubscribedIncidents = (userId) => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      setLoading(true);
      try {
        const data = await fetchSubscribedIncidents(userId);
        setIncidents(data);
      } catch (err) {
        setError("Failed to load incidents.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchIncidents();
  }, [userId]);

  return { incidents, loading, error };
};

export const useSubscriptions = (userId) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        const subs = await getUserSubscriptions(userId);
        setSubscriptions(subs);
      } catch (err) {
        setError("Failed to fetch subscriptions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [userId]);

  const unsubscribe = async (subscriptionId) => {
    try {
      await unsubscribeFromNeighborhood(subscriptionId);
      setSubscriptions((prev) =>
        prev.filter((sub) => sub.id !== subscriptionId)
      );
    } catch (err) {
      setError("Failed to unsubscribe.");
    }
  };

  return { subscriptions, loading, error, unsubscribe };
};
