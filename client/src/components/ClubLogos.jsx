import React from 'react';

function ClubLogos() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Row 1 */}
      <div className="flex items-center justify-center gap-8">
        <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-sm">Club Logo 1</span>
        </div>
        <div className="w-40 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-sm">Club Logo 2</span>
        </div>
        <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-sm">Club Logo 3</span>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex items-center justify-center gap-8">
        <div className="w-36 h-28 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-sm">Club Logo 4</span>
        </div>
        <div className="w-32 h-28 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-sm">Club Logo 5</span>
        </div>
      </div>

      {/* Row 3 */}
      <div className="flex items-center justify-center gap-8">
        <div className="w-32 h-28 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-sm">Club Logo 6</span>
        </div>
        <div className="w-40 h-28 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-sm">Club Logo 7</span>
        </div>
      </div>
    </div>
  );
}

export default ClubLogos;
