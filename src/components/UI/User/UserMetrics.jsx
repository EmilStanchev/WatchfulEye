/* eslint-disable react/prop-types */
import { useState } from "react";
import MetricCard from "../cards/UserMetricCard";

const UserMetrics = ({ userIncidentsCount, totalIncidentsCount }) => {
  const [showMetrics, setShowMetrics] = useState(false);

  const toggleMetricsVisibility = () => {
    setShowMetrics((prev) => !prev);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <button
        onClick={toggleMetricsVisibility}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-4"
      >
        {showMetrics ? "Hide Metrics" : "Show Metrics"}
      </button>

      {showMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetricCard
            title="Your Incidents"
            value={userIncidentsCount}
            bgColor="bg-blue-100"
          />
          <MetricCard
            title="Total Incidents"
            value={totalIncidentsCount}
            bgColor="bg-green-100"
          />
        </div>
      )}
    </div>
  );
};

export default UserMetrics;
