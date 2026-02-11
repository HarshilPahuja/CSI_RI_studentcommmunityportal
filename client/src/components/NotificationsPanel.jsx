import React from "react";
import { Bell } from "lucide-react";

const NotificationsPanel = ({ notifications, loading, error }) => {
  return (
    // <section className="px-8 py-6">
    //   <div className="flex items-center gap-2 mb-4">
    //     <Bell size={20} className="text-blue-600" />
    //     <h2 className="text-lg font-semibold text-gray-800">
    //       Notifications
    //     </h2>
    //   </div>

    //   {loading && (
    //     <div className="text-gray-400">Loading notifications...</div>
    //   )}

    //   {error && (
    //     <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
    //       {error}
    //     </div>
    //   )}

    //   {!loading && !error && notifications.length === 0 && (
    //     <div className="text-gray-400">
    //       No announcements yet. Follow clubs to get updates.
    //     </div>
    //   )}

    //   <div className="space-y-4">
    //     {notifications.map((notification) => (
    //       <div
    //         key={notification.id}
    //         className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
    //       >
    //         <div className="flex flex-wrap items-center justify-between gap-2">
    //           <h3 className="text-base font-semibold text-gray-900">
    //             {notification.title}
    //           </h3>
    //           <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
    //             {notification.club_name}
    //           </span>
    //         </div>
    //         <p className="text-sm text-gray-600 mt-2">
    //           {notification.description}
    //         </p>
    //         <div className="text-xs text-gray-400 mt-3 flex flex-wrap gap-4">
    //           <span>
    //             Posted{" "}
    //             {notification.created_at
    //               ? new Date(notification.created_at).toLocaleString()
    //               : "Just now"}
    //           </span>
    //           {notification.valid_till && (
    //             <span>
    //               Valid till{" "}
    //               {new Date(notification.valid_till).toLocaleString()}
    //             </span>
    //           )}
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </section>
    <div></div>
  );
};

export default NotificationsPanel;
