import React, { useEffect, useState, useMemo } from "react";

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

  const followedCount = useMemo(() => {
    if (!interestedClubs) return 0;
    return interestedClubs.length;
  }, [interestedClubs]);

  //  Loading state
  if (interestedClubs === null) {
    return (
      <div className="px-8 py-12 text-center text-gray-400">
        Loading interested clubs...
      </div>
    );
  }

  return (
    <div className="px-8 py-12 text-center text-gray-500">
      <p className="text-lg font-medium">Interested clubs view is now moved to notifications.</p>
      <p className="mt-2 text-sm text-gray-400">
        Use the bell icon in the header to see all club announcements.
      </p>
      <p className="mt-4 text-sm text-gray-400">You are following {followedCount} club(s).</p>
    </div>
  );
};

export default MyClubsPage;
