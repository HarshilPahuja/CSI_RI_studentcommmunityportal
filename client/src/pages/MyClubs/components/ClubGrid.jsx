import React from "react";
import ClubCard from "./ClubCard";

const ClubGrid = ({
  clubs,
  followedClubs = [],
  toggleFollow
}) => {
  if (!clubs || clubs.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {clubs.map((club, index) => {
        const isFollowing =
          followedClubs.length === 0 ||
          followedClubs.some((c) => c.name === club.name);

        return (
          <ClubCard
            key={index}
            club={club}
            isFollowing={isFollowing}
            onToggleFollow={
              toggleFollow ? () => toggleFollow(club) : undefined
            }
          />
        );
      })}
    </div>
  );
};

export default ClubGrid;
