// useIncidents.js

import { useQuery } from "@tanstack/react-query";
import { getIncidents } from "../services/incidents";

const useIncidents = () => {
  const {
    data: incidents,
    isLoading: loading,
    error,
    refetch: incidentsRefetch,
  } = useQuery({ queryKey: ["incidents"], queryFn: getIncidents });

  return { incidents, loading, error, incidentsRefetch };
};

export default useIncidents;
