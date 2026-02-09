
import React from "react";
import ClubCard from "./ClubCard";

const ClubGrid = ({ clubs, followedClubs = [], toggleFollow }) => {
  if (!clubs || clubs.length === 0) {
    return (
      <div className="px-8 py-12 text-center text-gray-400">
        No clubs to display
      </div>
    );
  }

  return (
    <div className="px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {clubs.map((club) => (
        <ClubCard
          key={club.name}
          club={club}
          isFollowing={followedClubs.some(
            (c) => c.name === club.name
          )}
          onToggleFollow={() => toggleFollow(club)}
        />
      ))}
    </div>
  );
};

export default ClubGrid;
