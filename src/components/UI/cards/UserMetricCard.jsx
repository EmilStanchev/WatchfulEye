/* eslint-disable react/prop-types */
const MetricCard = ({ title, value, bgColor }) => {
  return (
    <div
      className={`p-4 rounded-lg flex justify-between items-center shadow-sm ${bgColor}`}
    >
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h4 className="text-xl font-bold text-gray-700">{value}</h4>
      </div>
    </div>
  );
};

export default MetricCard;
