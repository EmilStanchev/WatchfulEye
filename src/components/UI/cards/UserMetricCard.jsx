/* eslint-disable react/prop-types */
import { FiUser, FiGlobe, FiHome, FiCalendar } from "react-icons/fi";

const MetricCard = ({ title, value, gradient, icon }) => {
  const icons = {
    user: FiUser,
    globe: FiGlobe,
    home: FiHome,
    calendar: FiCalendar,
  };

  // Get the selected icon or fallback to a default
  const SelectedIcon = icons[icon] || FiUser;

  return (
    <div
      className={`bg-gradient-to-r ${gradient} p-6 rounded-2xl shadow-xl flex items-center justify-between`}
    >
      <div>
        <p className="text-sm uppercase font-semibold tracking-wide text-gray-200">
          {title}
        </p>
        <h4 className="text-3xl font-extrabold text-white">{value}</h4>
      </div>
      <div className="bg-white bg-opacity-20 p-4 rounded-full">
        <SelectedIcon className="text-white text-3xl" />
      </div>
    </div>
  );
};

export default MetricCard;
