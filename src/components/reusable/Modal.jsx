/* eslint-disable react/prop-types */
// Modal.js

import { useEffect } from "react";

const Modal = ({ incident, onOpen, onClose }) => {
  useEffect(() => {
    if (onOpen) onOpen(); // Notify parent when modal opens
    return () => {
      if (onClose) onClose(); // Notify parent when modal closes
    };
  }, [onOpen, onClose]);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{incident.title}</h2>
      <p className="mb-2">{incident.description}</p>
      <p className="text-sm text-gray-700 mb-4">Address: {incident.address}</p>
      <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
        {incident.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="incident detail"
            className="w-full h-32 object-cover rounded-md"
          />
        ))}
      </div>
      <p className="text-red-500 text-center">
        Reported at:
        <br />
        {incident?.createdAt
          ? new Date(incident?.createdAt).toUTCString()
          : "Long before"}
      </p>
      <p className="text-red-500 text-center">
        Reported by:
        <br />
        {incident?.createdBy ? incident?.createdBy : "Anonymous"}
      </p>
    </div>
  );
};

export default Modal;
