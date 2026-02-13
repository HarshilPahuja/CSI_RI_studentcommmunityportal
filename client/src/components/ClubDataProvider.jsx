import { useEffect, useState } from 'react';

export const useClubData = () => {
  const [clubData, setClubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubData = async () => {

      const clubName = localStorage.getItem('club_name');

      if (!clubName) {
        setError('No club found. Please login again.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://csi-ri-studentcommmunityportal.onrender.com/clubdetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            club_name: clubName,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setClubData({
            name: data.clubName,
            description: data.clubDescription,
            bannerImage: data.bannerImage,
          });
        } else {
          setError(data.message || 'Failed to fetch club data');
        }
      } catch (err) {
        console.error('Error fetching club data:', err);
        setError('Network error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchClubData();
  }, []);

  return { clubData, loading, error };
};
