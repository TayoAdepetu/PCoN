import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/rootReducer";

export default function NotificationPage() {
  const { dashboardnotifications } = useSelector((state: RootState) => state.dashboardnotifications);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto p-6 pt-[72px]">
<h2 className="text-2xl sm:text-2xl font-bold mb-4">Notifications</h2>

      {dashboardnotifications?.length === 0 ? (
        <p className="text-gray-500">No notifications available.</p>
      ) : (
        <div className="space-y-4">
          {dashboardnotifications.map((notification) => (
            <div
              key={notification.id}
              className="border p-4 rounded-lg shadow-sm bg-white cursor-pointer hover:bg-gray-100 transition-all"
              onClick={() => setExpandedId(expandedId === notification.id ? null : notification.id)}
            >
              <div className="flex justify-between">
                <h2 className={`text-lg font-semibold ${notification.read ? "text-gray-500" : "text-black"}`}>
                  {notification.title}
                </h2>
                <span className="text-xs text-gray-400">{new Date(notification.created_at).toLocaleString()}</span>
              </div>

              {expandedId === notification.id && (
                <p className="mt-2 text-gray-700">{notification.message}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
