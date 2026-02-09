
import React from "react";
import { Plus, Check } from "lucide-react";

const ClubCard = ({ club, isFollowing, onToggleFollow }) => {
  if (!club) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Image */}
      <div className="relative">
        <img
          src={club.image}
          className="h-48 w-full object-cover"
          alt={club.name || "Club image"}
        />

        {/* Followed badge (only if followed) */}
        {isFollowing && (
          <span className="absolute top-4 left-4 bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
            Followed
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">
          {club.name}
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          {club.desc}
        </p>

        <div className="text-sm text-gray-700 mb-2">
          👤 Pres: {club.president}
        </div>

        <div className="text-sm text-gray-700 mb-4">
          ✉️ {club.email}
        </div>

        {/* Follow button */}
        <button
          onClick={onToggleFollow}
          className={`w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2
            ${
              isFollowing
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }
          `}
        >
          {isFollowing ? <Check size={16} /> : <Plus size={16} />}
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default ClubCard;
