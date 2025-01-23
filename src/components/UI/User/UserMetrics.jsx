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
  const [showMetrics, setShowMetrics] = useState(false);
  const [peakReportingDay, setPeakReportingDay] = useState("Loading...");
  const [showCharts, setShowCharts] = useState(false);

  const toggleMetricsVisibility = () => {
    setShowMetrics((prev) => !prev);
  };
  const toggleChartsVisibility = () => {
    setShowCharts((prev) => !prev);
  };

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
    <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 text-black p-8 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-center">
        Incident Metrics Dashboard
      </h2>
      <button
        onClick={toggleMetricsVisibility}
        className="bg-gradient-to-r from-gray-700 to-black text-white px-6 py-3 rounded-lg hover:scale-105 transform transition duration-300 shadow-lg"
      >
        {showMetrics ? "Hide Metrics" : "Show Metrics"}
      </button>

      {showMetrics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <MetricCard
              title="Your Incidents"
              value={userIncidentsCount}
              gradient="from-blue-500 to-indigo-500"
              icon="user"
            />
            <MetricCard
              title="Total Incidents"
              value={totalIncidentsCount}
              gradient="from-green-500 to-teal-500"
              icon="globe"
            />
            <MetricCard
              title="Subscribed Neighborhoods"
              value={userNeighborhoods}
              gradient="from-yellow-500 to-yellow-700"
              icon="home"
            />
            <MetricCard
              title="Peak Reporting Day"
              value={peakReportingDay}
              gradient="from-orange-500 to-red-600"
              icon="calendar"
            />
          </div>
          <div className="mt-8 flex flex-col gap-5 ">
            <button
              onClick={toggleChartsVisibility}
              className="bg-gradient-to-r from-gray-700 to-black w-full md:w-1/6 text-white px-6 py-3 rounded-lg hover:scale-105 transform transition duration-300 shadow-lg"
            >
              {showCharts ? "Hide Charts" : "Show Charts"}
            </button>
            <div className="">
              {showCharts && (
                <div className="grid grid-cols-3 gap-6 flex-wrap">
                  <IncidentTrendChart incidents={incidents} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMetrics;
