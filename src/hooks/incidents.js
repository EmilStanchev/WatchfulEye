// useIncidents.js

import { useQuery } from "@tanstack/react-query";
import { getIncidents, getIncidentsForUser } from "../services/incidents";

const useIncidents = () => {
  const {
    data: incidents,
    isLoading: loading,
    error,
    refetch: incidentsRefetch,
  } = useQuery({ queryKey: ["incidents"], queryFn: getIncidents });

  return { incidents, loading, error, incidentsRefetch };
};
const useUserIncidents = (userEmail) => {
  const {
    data: incidents,
    isLoading: loading,
    error,
    refetch: refetchIncidents,
  } = useQuery({
    queryKey: ["userIncidents", userEmail],
    queryFn: () => getIncidentsForUser(userEmail),
    enabled: !!userEmail,
  });

  return { incidents, loading, error, refetchIncidents };
};
export { useIncidents, useUserIncidents };
