
import React, { useEffect, useState } from "react";
import ClubGrid from "../DiscoverClubs/components/ClubGrid";

const MyClubsPage = () => {
  const [interestedClubs, setInterestedClubs] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("followedClubs");
    setInterestedClubs(saved ? JSON.parse(saved) : []);
  }, []);

  if (interestedClubs.length === 0) {
    return (
      <div className="px-8 py-12 text-center text-gray-400">
        You haven’t followed any clubs yet.
      </div>
    );
  }

  return (
    <ClubGrid
      clubs={interestedClubs}
      followedClubs={interestedClubs}
      toggleFollow={() => {}} 
    />
  );
};

export default MyClubsPage;
