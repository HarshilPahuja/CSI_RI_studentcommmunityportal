import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import AnnouncementButton from '../components/AnnouncementButton';
import NewAnnouncementModal from '../components/NewAnnouncementModal';
import { useClubData } from '../components/ClubDataProvider';

function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  
  // Fetch club data
  const { clubData, loading, error } = useClubData();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading club data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-semibold">Error loading club data</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Banner clubData={clubData} />
        
        <AnnouncementButton onClick={handleOpenModal} />
      </div>

      <NewAnnouncementModal 
        isOpen={showModal} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}

export default AdminDashboard;