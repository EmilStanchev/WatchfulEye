/* eslint-disable react/prop-types */
import {
  FaExclamationTriangle,
  FaUsers,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const iconMap = {
  "fas fa-exclamation-triangle": (
    <FaExclamationTriangle className="text-blue-500" size={50} />
  ),
  "fas fa-users": <FaUsers className="text-blue-500" size={50} />,
  "fas fa-check-circle": <FaCheckCircle className="text-blue-500" size={50} />,
  "fas fa-clock": <FaClock className="text-blue-500" size={50} />,
};

export default function MetricCard({ metric }) {
  const { title, value, description, icon } = metric;

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transform transition hover:-translate-y-2 text-center">
      <div className="mb-6 flex justify-center">{iconMap[icon]}</div>
      <h3 className="text-3xl font-bold text-white mb-4">{value}</h3>
      <p className="text-xl font-semibold text-blue-400">{title}</p>
      <p className="text-gray-400 mt-2">{description}</p>
    </div>
  );
}
