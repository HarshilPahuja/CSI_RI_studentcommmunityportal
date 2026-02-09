
import React, { useEffect, useState } from "react";
import ClubGrid from "../DiscoverClubs/components/ClubGrid";

const MyClubsPage = () => {
  const [interestedClubs, setInterestedClubs] = useState(null);

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

  //  Loading state
  if (interestedClubs === null) {
    return (
      <div className="px-8 py-12 text-center text-gray-400">
        Loading interested clubs...
      </div>
    );
  }

  //  Empty state
  if (interestedClubs.length === 0) {
    return (
      <div className="px-8 py-12 text-center text-gray-400">
        You haven’t followed any clubs yet.
      </div>
    );
  }

  //  Render interested clubs 
  return (
    <ClubGrid
      clubs={interestedClubs}
      followedClubs={interestedClubs}
      toggleFollow={() => {}}
    />
  );
};

export default MyClubsPage;

