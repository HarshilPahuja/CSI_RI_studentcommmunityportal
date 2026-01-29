import React from 'react';

function Banner({ clubData }) {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg">
      {/* Banner Image */}
      <img 
        src={clubData?.bannerImage || '/src/assets/banner.jpg'} 
        alt={`${clubData?.name || 'Club'} Banner`}
        className="w-full h-64 object-cover" 
      />
      
      {/* Gradient Overlay - darker at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      
      {/* Text Content - positioned at bottom left */}
      <div className="absolute bottom-0 left-0 right-0 px-12 pb-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-white mb-3">
            {clubData?.name || 'Loading...'}
          </h1>
          <p className="text-white text-lg">
            {clubData?.description || 'Loading club information...'}
          </p>
        </div>
      </div>
      
      {/* Edit Banner Button - overlay on image */}
      <button className="absolute top-4 right-4 bg-gray-700 bg-opacity-70 hover:bg-opacity-90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        Edit Banner
      </button>
    </div>
  );
}

export default Banner;