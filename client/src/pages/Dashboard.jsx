import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import { Heart } from "lucide-react";
import { io } from "socket.io-client";

import DiscoverClubsPage from "./DiscoverClubs/DiscoverClubsPage";
import MyClubsPage from "./MyClubs/MyClubsPage";
import Filters from "./DiscoverClubs/components/Filters";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("All");
  const categories = ["All", "TECH", "SPORTS", "CULTURAL", "SOCIAL"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [followedClubs, setFollowedClubs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notificationsError, setNotificationsError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setFollowedClubs([]);
      return;
    }

    const saved = localStorage.getItem(`followedClubs_${userId}`);
    const parsed = saved ? JSON.parse(saved) : [];
    setFollowedClubs(parsed);
  }, [userId]);

  const clubNames = useMemo(
    () => followedClubs.map((club) => club?.name).filter(Boolean),
    [followedClubs]
  );

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
        const response = await fetch("http://localhost:3000/notifications/list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ clubs: clubNames }),
        });

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
        setNotificationsError(error?.message || "Unable to load notifications");
      } finally {
        setNotificationsLoading(false);
      }
    };

    fetchNotifications();
  }, [clubNames]);

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

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header
        notifications={notifications}
        notificationsLoading={notificationsLoading}
        notificationsError={notificationsError}
      />

      {/* ONE TAB BAR */}
      <div className="flex gap-6 px-8 mt-6 border-b">
        <button
          onClick={() => setActiveTab("Interested")}
          className={`pb-3 font-semibold ${
            activeTab === "Interested"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-400"
          }`}
        >
          <Heart size={16} className="inline mr-1" />
          Interested Clubs
        </button>

        <button
          onClick={() => setActiveTab("All")}
          className={`pb-3 font-semibold ${
            activeTab === "All"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-400"
          }`}
        >
          All Clubs
        </button>
      </div>

      {/* FILTERS ONLY FOR ALL CLUBS */}
      {activeTab === "All" && (
        <Filters
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          search={search}
          setSearch={setSearch}
        />
      )}

      {/* CONTENT */}
      <div className="px-8 mt-6">
        {activeTab === "All" ? (
          <DiscoverClubsPage activeCategory={activeCategory} search={search} />
        ) : (
          <MyClubsPage />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
