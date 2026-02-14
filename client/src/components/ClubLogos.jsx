import React from 'react';

function ClubLogos() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 -mt-16">
      {/* Row 1 */}
      <div className="flex items-center justify-center gap-6 -ml-32">
        <div className=" flex items-center justify-center">
          <img 
            src="src\assets\clublogos\SquadUp.png" 
            alt="Squad Up" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="max-w-full max-h-full flex items-center justify-center">
          <img 
            src="src\assets\clublogos\Cosmos.png" 
            alt="Club 2" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex items-center justify-center gap-6 ml-32">
        <div className="max-w-full max-h-full flex items-center justify-center">
          <img 
            src="src\assets\clublogos\VegapodHyperloop.png" 
            alt="Club 3" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="max-w-full max-h-full flex items-center justify-center">
          <img 
            src="src\assets\clublogos\InnovationHub.png" 
            alt="Club 4" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="flex items-center justify-center gap-6 -ml-32">
        <div className="max-w-full max-h-full flex items-center justify-center">
          <img 
            src="src\assets\clublogos\Chalchitra.png" 
            alt="Club 5" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="max-w-full max-h-full flex items-center justify-center">
          <img 
            src="src\assets\clublogos\CSI.png" 
            alt="Club 6" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Row 4 */}
      <div className="flex items-center justify-center gap-6 ml-32">
        <div className="max-w-full max-h-full flex items-center justify-center">
          <img 
            src="src\assets\clublogos\TheRock.png" 
            alt="Club 5" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="max-w-full max-h-full flex items-center justify-center">
          <img 
            src="src\assets\clublogos\Tedx.png" 
            alt="Club 7" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default ClubLogos;