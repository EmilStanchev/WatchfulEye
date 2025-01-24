/* eslint-disable react/prop-types */
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import CustomTooltip from "../../reusable/CustomTooltip";

const IncidentsTable = ({ incidents, handleDeleteClick, handleEditClick }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow bg-white">
      {/* Add New Button */}
      <div className="p-4 flex justify-end">
        <CustomTooltip text="Add new incident">
          <Link
            className="cursor-pointer p-2 bg-blue-500 hover:bg-blue-900 rounded-full"
            to={"/addIncident"}
          >
            <FaPlus className="text-white" />
          </Link>
        </CustomTooltip>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-6 py-4 text-lg font-semibold">Title</th>
              <th className="px-6 py-4 text-lg font-semibold">Description</th>
              <th className="px-6 py-4 text-lg font-semibold">Date</th>
              <th className="px-6 py-4 text-lg font-semibold">Address</th>
              <th className="px-6 py-4 text-lg font-semibold text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {incidents?.map((incident) => (
              <tr
                key={incident.id}
                className="border-b transition duration-300"
              >
                <td className="px-6 py-4 text-red-500 text-sm font-medium">
                  {incident.title}
                </td>
                <td className="px-6 py-4 text-sm">{incident.description}</td>
                <td className="px-6 py-4 text-sm">
                  {new Date(incident?.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-xs">{incident?.address}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => handleEditClick(incident?.id)}
                    className="text-indigo-500 hover:text-indigo-700 transition duration-150"
                    title="Edit Incident"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(incident?.id)}
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
    </div>
  );
};

export default IncidentsTable;
