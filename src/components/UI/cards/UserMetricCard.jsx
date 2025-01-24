/* eslint-disable react/prop-types */
import { FiUser, FiGlobe, FiHome, FiCalendar } from "react-icons/fi";

const MetricCard = ({ title, value, gradient, icon }) => {
  const icons = {
    user: FiUser,
    globe: FiGlobe,
    home: FiHome,
    calendar: FiCalendar,
  };

  const SelectedIcon = icons[icon] || FiUser;

  return (
    <div
      className={`relative bg-gradient-to-r ${gradient} text-black rounded-lg shadow-md p-6 flex items-center justify-between`}
    >
      <div>
        <p className="text-sm uppercase font-semibold opacity-90">{title}</p>
        <h4 className="text-4xl font-bold">{value}</h4>
      </div>
      <div className="p-4 bg-gray-500 bg-opacity-20 rounded-full">
        <SelectedIcon className="text-black text-3xl" />
      </div>
      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black via-transparent to-transparent opacity-10 rounded-lg"></div>
    </div>
  );
};

export default MetricCard;
