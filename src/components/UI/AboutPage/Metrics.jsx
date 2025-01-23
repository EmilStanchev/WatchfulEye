import MetricCard from "../cards/MetricCard";
import { neighborhoodsInSofia } from "../../../assets/data/data";

const metrics = [
  {
    title: "Incidents Reported",
    value: "1,245",
    description: "Real-time reports from active community members.",
    icon: "fas fa-exclamation-triangle",
  },
  {
    title: "Active Users",
    value: "7,842",
    description: "Engaged neighbors contributing to safety.",
    icon: "fas fa-users",
  },
  {
    title: "Registered Neighborhoods",
    value: `${neighborhoodsInSofia?.length}`,
    description: "Issues resolved with community efforts.",
    icon: "fas fa-check-circle",
  },
  {
    title: "Average adding time",
    value: "1 min",
    description: "Report new incident",
    icon: "fas fa-clock",
  },
];

export default function Metrics() {
  return (
    <section
      id="metrics"
      className="py-20 bg-gradient-to-b from-gray-100 to-gray-400 text-black"
    >
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-12">
          Our <span className="text-blue-500">Impact in Numbers</span>
        </h2>
        <p className="text-lg text-gray-400 mb-16">
          See how we are transforming communities through collaboration and
          technology.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
