
import React, { useState } from "react";
import Header from "../components/Header";
import { Heart } from "lucide-react";

import DiscoverClubsPage from "./DiscoverClubs/DiscoverClubsPage";
import MyClubsPage from "./MyClubs/MyClubsPage";
import Filters from "./DiscoverClubs/components/Filters";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("All");


  const categories = ["All", "TECH", "SPORTS", "CULTURAL", "SOCIAL"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />

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
          <DiscoverClubsPage
            activeCategory={activeCategory}
            search={search}
          />
        ) : (
          <MyClubsPage />
        )}
      </div>
    </div>
  );
};

export default Dashboard;





