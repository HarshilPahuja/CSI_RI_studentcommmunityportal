import React, { useState } from "react";
import { Heart } from "lucide-react";
import ClubGrid from "./ClubGrid";

const Tabs = ({ allClubs = [], followedClubs = [], toggleFollow }) => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <>
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
          Interested Clubs ({followedClubs.length})
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

      <div className="px-8 mt-6">
        {activeTab === "All" ? (
          <ClubGrid
            clubs={allClubs}
            followedClubs={followedClubs}
            toggleFollow={toggleFollow}
          />
        ) : (
          <ClubGrid
            clubs={followedClubs}
            followedClubs={followedClubs}
            toggleFollow={toggleFollow}
          />
        )}
      </div>
    </>
  );
};

export default Tabs;






