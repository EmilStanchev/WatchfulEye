/* eslint-disable react/prop-types */
import { useState } from "react";

const TooltipButton = ({ tooltipText, icon: Icon, onClick, isStyled }) => {
  const [isHovered, setIsHovered] = useState(false);
  const classNamesForButton = isStyled
    ? "w-16 h-16 bg-blue-600 text-white rounded-full shadow-xl flex justify-center items-center hover:bg-blue-700 active:scale-95 transition-all duration-300"
    : " text-white rounded-full shadow-xl flex justify-center items-center hover:bg-blue-700 active:scale-95 transition-all duration-300";
  console.log(isHovered);

  return (
    <div className="relative">
      {/* Tooltip text */}
      {isHovered && (
        <div className="absolute w-full bottom-20 right-0 bg-gray-800 text-white text-sm px-2 py-1 rounded-md shadow-lg z-50 ">
          {tooltipText}
        </div>
      )}

      {/* Button */}
      <button
        className={classNamesForButton}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        aria-label={tooltipText}
      >
        {Icon && <Icon className="h-8 w-8" />}
      </button>
    </div>
  );
};

export default TooltipButton;
