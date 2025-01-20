/* eslint-disable react/prop-types */
// Modal.js

const Modal = ({ incident }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{incident.title}</h2>
      <p className="mb-2">{incident.description}</p>
      <p className="text-sm text-gray-500 mb-4">Address: {incident.address}</p>
      <div className="grid grid-cols-2 gap-2">
        {incident.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="incident detail"
            className="w-full h-32 object-cover rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default Modal;
