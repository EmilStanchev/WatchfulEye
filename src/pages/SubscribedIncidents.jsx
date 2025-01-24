/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSubscribedIncidents } from "../hooks/subscriptions";
import NeighborCard from "../components/UI/cards/NeighborCard";
import CustomSpinner from "../components/reusable/CustomSpinner";

const SubscribedIncidents = ({ userId }) => {
  const { incidents, loading, error } = useSubscribedIncidents(userId);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");

  const neighborhoods = [
    ...new Set(incidents.map((incident) => incident.neighborhood)),
  ];

  const filteredIncidents = selectedNeighborhood
    ? incidents.filter(
        (incident) => incident.neighborhood === selectedNeighborhood
      )
    : incidents;

  if (loading) return <CustomSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (incidents.length === 0)
    return (
      <div className="text-black text-xl flex justify-center items-center flex-col gap-5">
        <p>No incidents found for subscribed neighborhoods.</p>

        <Link
          to="/subscribeToNeighbor"
          className="px-6 sm:px-8 py-2 sm:py-3 capitalize bg-blue-500 text-white rounded-md font-medium text-sm sm:text-lg hover:bg-blue-600 transition duration-200"
        >
          Subscribe now
        </Link>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
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
