/* eslint-disable react/prop-types */
// Modal.js

const Modal = ({ incident }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{incident.title}</h2>
      <p className="mb-2 overflow-y-auto max-h-32 bg-gray-200 shadow-lg border-1 border-gray-400 rounded-lg p-2">
        {incident.description}
      </p>
      <p className="text-sm text-gray-700 mb-4">Address: {incident.address}</p>
      <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
        {incident.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="incident image"
            className="w-full h-32 object-cover rounded-md"
          />
        ))}
      </div>
      <div className="text-center mt-4">
        <p className="text-gray-600 text-sm">
          <span className="font-medium text-gray-800">Reported at:</span>{" "}
          {incident?.createdAt
            ? new Date(incident?.createdAt).toUTCString()
            : "Long before"}
        </p>
        <p className="text-gray-600 text-sm mt-2">
          <span className="font-medium text-gray-800">Reported by:</span>{" "}
          {incident?.createdBy?.userName || "Anonymous"}
        </p>
      </div>
    </div>
  );
};

export default Modal;
