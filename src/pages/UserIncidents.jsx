/* eslint-disable react/prop-types */
import { FaEdit, FaTrash } from "react-icons/fa";
import { useUserIncidents } from "../hooks/incidents";
import { deleteIncident } from "../services/incidents";

const IncidentTable = ({ userEmail }) => {
  const { incidents, error } = useUserIncidents(userEmail);

  if (error) {
    return (
      <div className="text-center text-red-500 mt-6">
        An error occurred while fetching incidents. Please try again later.
      </div>
    );
  }

  if (!incidents || incidents.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-6">
        No incidents reported yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white rounded-lg shadow-md border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="text-left px-6 py-4 font-medium text-gray-600">
              Title
            </th>
            <th className="text-left px-6 py-4 font-medium text-gray-600">
              Description
            </th>
            <th className="text-left px-6 py-4 font-medium text-gray-600">
              Date
            </th>
            <th className="text-left px-6 py-4 font-medium text-gray-600">
              Status
            </th>
            <th className="text-center px-6 py-4 font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr
              key={incident.id}
              className="border-b hover:bg-gray-50 transition duration-200"
            >
              <td className="px-6 py-4 text-gray-700">{incident.title}</td>
              <td className="px-6 py-4 text-gray-500">
                {incident.description}
              </td>
              <td className="px-6 py-4 text-gray-500">
                {new Date(incident?.createdAt * 1000).toUTCString()}
              </td>
              <td className="px-6 py-4 text-gray-500">{incident?.address}</td>
              <td className="px-6 py-4 text-center space-x-4">
                {/* Edit Button */}
                <button
                  className="text-blue-500 hover:text-blue-700 transition duration-150"
                  title="Edit Incident"
                >
                  <FaEdit size={18} />
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => deleteIncident(incident?.id)}
                  className="text-red-500 hover:text-red-700 transition duration-150"
                  title="Delete Incident"
                >
                  <FaTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentTable;
