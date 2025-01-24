/* eslint-disable react/prop-types */
/* Tooltip.js */
const CustomTooltip = ({ text, children }) => {
  return (
    <div className="relative group flex items-end flex-col float-end">
      <div className="mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
        {text}
      </div>
      {children}
    </div>
  );
};

export default CustomTooltip;
