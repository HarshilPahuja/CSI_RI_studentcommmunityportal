import { useEffect, useState } from 'react';

// Custom hook to fetch club data
export const useClubData = () => {
  const [clubData, setClubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubData = async () => {
      // Get userId from localStorage
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        setError('No user ID found. Please login again.');
        setLoading(false);
        return;
      }

      try {
        // API call to fetch club data
        const response = await fetch('http://localhost:3000/clubdetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
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