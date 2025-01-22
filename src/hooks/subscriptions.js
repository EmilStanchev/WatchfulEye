import { useState, useEffect } from "react";
import { fetchSubscribedIncidents } from "../services/subscriptions";

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
