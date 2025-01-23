import { useQuery } from "@tanstack/react-query";
import {
  fetchSubscribedIncidents,
  getUserSubscriptions,
  unsubscribeFromNeighborhood,
} from "../services/subscriptions";

export const useSubscribedIncidents = (userId) => {
  const {
    data: incidents = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["subscribedIncidents", userId],
    queryFn: () => fetchSubscribedIncidents(userId),
    enabled: !!userId, // Only fetch if userId exists
    retry: 2, // Retry twice on failure
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
  });

  return {
    incidents,
    loading: isLoading,
    error: isError ? error.message || "Failed to load incidents." : null,
  };
};

export const useSubscriptions = (userId) => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch, // Add refetch to enable manual refetching
  } = useQuery({
    queryKey: ["subscriptions", userId],
    queryFn: () => getUserSubscriptions(userId),
  });

  const unsubscribe = async (subId) => {
    try {
      await unsubscribeFromNeighborhood(subId);
      refetch(); // Refetch after a subscription is deleted
    } catch (err) {
      console.log(err);

      throw new Error("Failed to unsubscribe");
    }
  };

  return {
    subscriptions: data || [],
    loading: isLoading,
    error: isError ? error.message : null,
    unsubscribe,
    refetch, // Expose refetch to the component
  };
};
