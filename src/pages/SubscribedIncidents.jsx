/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSubscribedIncidents } from "../hooks/subscriptions";
import NeighborCard from "../components/UI/cards/NeighborCard";
import CustomSpinner from "../components/reusable/CustomSpinner";

const SubscribedIncidents = ({ userId }) => {
  const { incidents, loading, error } = useSubscribedIncidents(userId);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const neighborhoods = [
    ...new Set(incidents.map((incident) => incident.neighborhood)),
  ];

  // Filter by Neighborhood
  let filteredIncidents = selectedNeighborhood
    ? incidents.filter(
        (incident) => incident.neighborhood === selectedNeighborhood
      )
    : incidents;

  // Filter by Date Range
  if (startDate || endDate) {
    const start = startDate ? new Date(startDate).getTime() : -Infinity;
    const end = endDate ? new Date(endDate).getTime() : Infinity;

    filteredIncidents = filteredIncidents.filter(
      (incident) => incident.createdAt >= start && incident.createdAt <= end
    );
  }

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

      {/* Filters Section */}
      <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Neighborhood Filter */}
        <div>
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

        {/* Start Date Filter */}
        <div>
          <label htmlFor="startDate" className="block text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* End Date Filter */}
        <div>
          <label htmlFor="endDate" className="block text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
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
