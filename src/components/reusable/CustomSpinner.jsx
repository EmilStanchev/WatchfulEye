/* eslint-disable react/prop-types */
const CustomSpinner = ({ size = "16", color = "blue-500", message = "" }) => {
  return (
    <div className="absolute top-1/2 right-1/2 items-center justify-center space-y-2">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent border-${color} h-${size} w-${size}`}
        role="status"
      ></div>
      {message && (
        <span className="text-sm text-black font-medium">{message}</span>
      )}
    </div>
  );
};

export default CustomSpinner;
