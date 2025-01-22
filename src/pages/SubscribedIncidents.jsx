/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSubscribedIncidents } from "../hooks/subscriptions";
import NeighborCard from "../components/UI/cards/NeighborCard";

const SubscribedIncidents = ({ userId }) => {
  const { incidents, loading, error } = useSubscribedIncidents(userId);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");

  // Extract unique neighborhoods for the dropdown
  const neighborhoods = [
    ...new Set(incidents.map((incident) => incident.neighborhood)),
  ];

  // Filter incidents based on selected neighborhood
  const filteredIncidents = selectedNeighborhood
    ? incidents.filter(
        (incident) => incident.neighborhood === selectedNeighborhood
      )
    : incidents;

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (incidents.length === 0)
    return (
      <div className="text-gray-500">
        No incidents found for subscribed neighborhoods.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to={"/subscribeToNeighbor"}
        className="mt-4 inline-block text-2xl text-blue-500 hover:underline"
      >
        Subscribe to new neighborhood
      </Link>
      <h2 className="text-2xl font-bold mb-6">
        Incidents from Subscribed Neighborhoods
      </h2>

      {/* Neighborhood Filter Dropdown */}
      <div className="mb-4">
        <label
          htmlFor="neighborhoodFilter"
          className="block text-gray-700 mb-2"
        >
          Filter by Neighborhood
        </label>
        <select
          id="neighborhoodFilter"
          value={selectedNeighborhood}
          onChange={(e) => setSelectedNeighborhood(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">All Neighborhoods</option>
          {neighborhoods.map((neighborhood) => (
            <option key={neighborhood} value={neighborhood}>
              {neighborhood}
            </option>
          ))}
        </select>
      </div>

      {/* Incident Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-5">
        {filteredIncidents.map((incident) => (
          <NeighborCard key={incident?.id} incident={incident} />
        ))}
      </div>
    </div>
  );
};

export default SubscribedIncidents;
