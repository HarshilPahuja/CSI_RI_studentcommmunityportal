//without id part
// import React, { useState, useEffect } from "react";
// import ClubGrid from "./components/ClubGrid";

// const DiscoverClubsContainer = ({ activeCategory, search }) => {
//   const [clubs, setClubs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   //  Followed clubs 
//   const [followedClubs, setFollowedClubs] = useState(() => {
//     const saved = localStorage.getItem("followedClubs");
//     return saved ? JSON.parse(saved) : [];
//   });

//   //  Fetch clubs
//   useEffect(() => {
//     const fetchClubs = async () => {
//       setLoading(true);

//       try {
//         let url = "http://localhost:3000/clubs";

//         if (activeCategory && activeCategory !== "All") {
//           url += `?category=${activeCategory.toLowerCase()}`;
//         }

//         const res = await fetch(url);
//         const data = await res.json();

       
//         const normalizedClubs = data.map((c) => ({
//           name: c.club_name,
//           desc: c.about,
//           image: c.banner_image_url,
//           category: c.club_category,
//           president: c.president_name,
//           email: c.email
//         }));

//         setClubs(normalizedClubs);
//       } catch (error) {
//         console.error("Error fetching clubs:", error);
//         setClubs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClubs();
//   }, [activeCategory]);

//   //  Persist followed clubs
//   useEffect(() => {
//     localStorage.setItem("followedClubs", JSON.stringify(followedClubs));
//   }, [followedClubs]);

//   //  Follow / Unfollow logic
//   const toggleFollow = (club) => {
//     setFollowedClubs((prev) =>
//       prev.find((c) => c.name === club.name)
//         ? prev.filter((c) => c.name !== club.name)
//         : [...prev, club]
//     );
//   };

//   //  Search filter
//   const filteredClubs = clubs.filter((club) =>
//     !search ||
//     club.name.toLowerCase().includes(search.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="px-8 py-12 text-center text-gray-400">
//         Loading clubs...
//       </div>
//     );
//   }

//   return (
//     <ClubGrid
//       clubs={filteredClubs}
//       followedClubs={followedClubs}
//       toggleFollow={toggleFollow}
//     />
//   );
// };

// export default DiscoverClubsContainer;





import React, { useState, useEffect } from "react";
import ClubGrid from "./components/ClubGrid";

const DiscoverClubsContainer = ({ activeCategory, search }) => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Get current userId (set during login)
  const userId = localStorage.getItem("userId");

  //  Followed clubs (USER-SPECIFIC)
  const [followedClubs, setFollowedClubs] = useState(() => {
    if (!userId) return [];
    const saved = localStorage.getItem(`followedClubs_${userId}`);
    return saved ? JSON.parse(saved) : [];
  });

  //  Fetch clubs from backend
  useEffect(() => {
    const fetchClubs = async () => {
      setLoading(true);

      try {
        let url = "http://localhost:3000/clubs";

        if (activeCategory && activeCategory !== "All") {
          url += `?category=${activeCategory.toLowerCase()}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        //  Normalize backend → frontend
        const normalizedClubs = data.map((c) => ({
          name: c.club_name,
          desc: c.about,
          image: c.banner_image_url,
          category: c.club_category,
          president: c.president_name,
          email: c.email
        }));

        setClubs(normalizedClubs);
      } catch (error) {
        console.error("Error fetching clubs:", error);
        setClubs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, [activeCategory]);

  //  Persist followed clubs (USER-SPECIFIC)
  useEffect(() => {
    if (!userId) return;

    localStorage.setItem(
      `followedClubs_${userId}`,
      JSON.stringify(followedClubs)
    );
  }, [followedClubs, userId]);

  //  Follow / Unfollow logic
  const toggleFollow = (club) => {
    if (!userId) return; // safety: not logged in

    setFollowedClubs((prev) =>
      prev.find((c) => c.name === club.name)
        ? prev.filter((c) => c.name !== club.name)
        : [...prev, club]
    );
  };

  //  Search filter
  const filteredClubs = clubs.filter(
    (club) =>
      !search ||
      club.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="px-8 py-12 text-center text-gray-400">
        Loading clubs...
      </div>
    );
  }

  return (
    <ClubGrid
      clubs={filteredClubs}
      followedClubs={followedClubs}
      toggleFollow={toggleFollow}
    />
  );
};

export default DiscoverClubsContainer;
