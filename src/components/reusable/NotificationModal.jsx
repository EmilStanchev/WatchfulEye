/* eslint-disable react/prop-types */
import { FaTrash } from "react-icons/fa";

import { deleteNotification } from "../../services/notifications";

const NotificationModal = ({
  closeModal,
  notifications,
  refreshNotifications,
}) => {
  const handleDeleteNotification = async (notificationId) => {
    try {
      await deleteNotification(notificationId);
      if (refreshNotifications) {
        refreshNotifications();
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-11/12 max-w-md rounded-lg p-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-bold">Notifications</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="mt-4">
          {notifications?.length > 0 ? (
            notifications?.map((notif) => (
              <div
                key={notif.id}
                className={`p-2 mb-2 rounded flex justify-between items-center ${
                  notif.read ? "bg-gray-100" : "bg-blue-100"
                }`}
              >
                <div>
                  <p className="text-sm text-gray-800">{notif.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(notif.timestamp).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteNotification(notif.id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No notifications yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
