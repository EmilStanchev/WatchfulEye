// hooks/useNotifications.js
import { useQuery } from "@tanstack/react-query";
import { fetchUserNotifications } from "../services/notifications";

export const useNotifications = (userId) => {
  const {
    data: notifications,
    isLoading: loading,
    error,
    refetch: notificationsRefetch,
  } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => fetchUserNotifications(userId),
    enabled: !!userId,
  });

  return { notifications, loading, error, notificationsRefetch };
};
