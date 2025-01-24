/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import MetricCard from "../cards/UserMetricCard";
import { calculatePeakReportingDay } from "../../../services/helpers/peakDay";
import IncidentTrendChart from "../../charts/IncidentTrendChart";

const UserMetrics = ({
  userIncidentsCount,
  totalIncidentsCount,
  userNeighborhoods,
  incidents,
}) => {
  const [showCharts, setShowCharts] = useState(false);
  const [peakReportingDay, setPeakReportingDay] = useState("Loading...");

  useEffect(() => {
    if (incidents?.length > 0) {
      const timestamps = incidents.map((incident) => incident.createdAt);
      const peakDay = calculatePeakReportingDay(timestamps);
      setPeakReportingDay(peakDay);
    } else {
      setPeakReportingDay("No Data");
    }
  }, [incidents]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Incident Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Your Incidents"
          value={userIncidentsCount}
          // gradient="from-blue-500 to-indigo-500"
          gradient="from-white to-gray-200"
          icon="user"
        />
        <MetricCard
          title="Total Incidents"
          value={totalIncidentsCount}
          gradient="from-white to-gray-200"
          //  gradient="from-green-500 to-teal-500"
          icon="globe"
        />
        <MetricCard
          title="Subscribed Neighborhoods"
          value={userNeighborhoods}
          gradient="from-white to-gray-200"
          //  gradient="from-yellow-400 to-orange-500"
          icon="home"
        />
        <MetricCard
          title="Peak Reporting Day"
          value={peakReportingDay}
          gradient="from-white to-gray-200"
          //gradient="from-red-400 to-pink-500"
          icon="calendar"
        />
      </div>

      <div>
        <button
          onClick={() => setShowCharts(!showCharts)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          {showCharts ? "Hide Charts" : "Show Charts"}
        </button>
        {showCharts && (
          <div className="mt-6">
            <IncidentTrendChart incidents={incidents} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMetrics;
