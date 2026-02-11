import React, { useMemo, useState } from "react";
import { Bell, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({
  notifications = [],
  notificationsLoading = false,
  notificationsError = "",
}) => {
  const navigate = useNavigate();
  const [isBellOpen, setIsBellOpen] = useState(false);

  const unreadCount = useMemo(() => notifications.length, [notifications]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b relative">
      <h1 className="text-xl font-bold">Socio</h1>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setIsBellOpen((prev) => !prev)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="cursor-pointer" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {isBellOpen && (
            <div className="absolute right-0 mt-2 w-96 max-h-[420px] overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg z-50">
              <div className="px-4 py-3 border-b border-gray-100 font-semibold text-gray-800">
                Notifications
              </div>

              {notificationsLoading && (
                <div className="px-4 py-3 text-sm text-gray-500">Loading notifications...</div>
              )}

              {notificationsError && (
                <div className="px-4 py-3 text-sm text-red-600">{notificationsError}</div>
              )}

              {!notificationsLoading && !notificationsError && notifications.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-500">No notifications yet.</div>
              )}

              {!notificationsLoading &&
                !notificationsError &&
                notifications.map((notification) => (
                  <div key={notification.id} className="px-4 py-3 border-b last:border-b-0 border-gray-100">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {notification.title}
                      </p>
                      <span className="text-[11px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full shrink-0">
                        {notification.club_name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 ">{notification.description}</p>
                    <div className="text-[11px] text-gray-400 mt-2">
                      {notification.created_at
                        ? new Date(notification.created_at).toLocaleString()
                        : "Just now"}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <Settings className="cursor-pointer" />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
