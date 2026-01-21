import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import AnnouncementButton from '../components/AnnouncementButton';
import NewAnnouncementModal from '../components/NewAnnouncementModal';

function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        <Banner />
        
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
