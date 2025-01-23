/* eslint-disable react/prop-types */
import { FaMapMarkerAlt, FaBullhorn, FaUsers, FaInfo } from "react-icons/fa";

const iconMap = {
  "fas fa-map-marker-alt": (
    <FaMapMarkerAlt className="text-blue-500" size={40} />
  ),
  "fas fa-bullhorn": <FaBullhorn className="text-blue-500" size={40} />,
  "fas fa-users": <FaUsers className="text-blue-500" size={40} />,
  "fas fa-info": <FaInfo className="text-blue-500" size={40} />,
};

export default function FeatureCard({ feature }) {
  const { title, description, icon } = feature;

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
      <div className="mb-6 flex justify-center">{iconMap[icon]}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
