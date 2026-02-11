
import React, { useEffect, useMemo, useState } from "react";
import ClubGrid from "../DiscoverClubs/components/ClubGrid";
import NotificationsPanel from "../../components/NotificationsPanel";
import { io } from "socket.io-client";

const MyClubsPage = () => {
  const [interestedClubs, setInterestedClubs] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notificationsError, setNotificationsError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    //  If user not logged in
    if (!userId) {
      setInterestedClubs([]);
      return;
    }

    //  Load user-specific followed clubs
    const saved = localStorage.getItem(`followedClubs_${userId}`);
    const parsed = saved ? JSON.parse(saved) : [];

    setInterestedClubs(parsed);
  }, []);

  const clubNames = useMemo(() => {
    if (!interestedClubs) return [];
    return interestedClubs
      .map((club) => club?.name)
      .filter(Boolean);
  }, [interestedClubs]);

  const isNotificationActive = (notification) => {
    if (!notification?.valid_till) return true;
    return new Date(notification.valid_till) > new Date();
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!clubNames.length) {
        setNotifications([]);
        setNotificationsLoading(false);
        return;
      }

      setNotificationsLoading(true);
      setNotificationsError("");

      try {
        const response = await fetch(
          "http://localhost:3000/notifications/list",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ clubs: clubNames }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load notifications");
        }

        const activeNotifications = (data.notifications || []).filter(
          isNotificationActive
        );

        setNotifications(activeNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotificationsError(
          error?.message || "Unable to load notifications"
        );
      } finally {
        setNotificationsLoading(false);
      }
    };

    if (interestedClubs !== null) {
      fetchNotifications();
    }
  }, [clubNames, interestedClubs]);

  useEffect(() => {
    if (!clubNames.length) return;

    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      socket.emit("join_clubs", clubNames);
    });

    socket.on("notification:new", (notification) => {
      if (!isNotificationActive(notification)) return;

      setNotifications((prev) => {
        if (prev.some((item) => item.id === notification.id)) {
          return prev;
        }

        return [notification, ...prev];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [clubNames]);

  //  Loading state
  if (interestedClubs === null) {
    return (
      <div className="px-8 py-12 text-center text-gray-400">
        Loading interested clubs...
      </div>
    );
  }

  //  Empty state
  if (followedClubs.length === 0) {
    return (
      <div className="px-8 py-12 text-center text-gray-400">
        You haven’t followed any clubs yet.
      </div>
    );
  }

  //  Render interested clubs only (notifications are in bell)
  return (
    <>
      <NotificationsPanel
        notifications={notifications}
        loading={notificationsLoading}
        error={notificationsError}
      />
      <ClubGrid
        clubs={interestedClubs}
        followedClubs={interestedClubs}
        toggleFollow={() => {}}
      />
    </>
  );
};

export default MyClubsPage;
