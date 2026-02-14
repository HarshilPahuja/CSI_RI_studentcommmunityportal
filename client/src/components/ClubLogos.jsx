import React from 'react';

import SquadUp from '../assets/clublogos/SquadUp.png';
import Cosmos from '../assets/clublogos/Cosmos.png';
import VegapodHyperloop from '../assets/clublogos/VegapodHyperloop.png';
import InnovationHub from '../assets/clublogos/InnovationHub.png';
import Chalchitra from '../assets/clublogos/Chalchitra.png';
import CSI from '../assets/clublogos/CSI.png';
import TheRock from '../assets/clublogos/TheRock.png';
import Tedx from '../assets/clublogos/Tedx.png';

function ClubLogos() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 -mt-16">
      {/* Row 1 */}
      <div className="flex items-center justify-center gap-6 -ml-32">
        <div className=" flex items-center justify-center">
          <img 
            src={SquadUp} 
            alt="SquadUp" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="max-w-full max-h-full flex items-center justify-center">
          <img 
            src={Cosmos}
            alt="Cosmos" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex items-center justify-center gap-6 ml-32">
        <div className="max-w-full max-h-full flex items-center justify-center">
          <img 
            src={VegapodHyperloop}
            alt="VegapodHyperloop" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="max-w-full max-h-full flex items-center justify-center">
          <img 
            src={InnovationHub}
            alt="InnovationHub" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="flex items-center justify-center gap-6 -ml-32">
        <div className="max-w-full max-h-full flex items-center justify-center">
          <img 
            src={Chalchitra} 
            alt="Chalchitra" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="max-w-full max-h-full flex items-center justify-center">
          <img 
            src={CSI}
            alt="CSI" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Row 4 */}
      <div className="flex items-center justify-center gap-6 ml-32">
        <div className="max-w-full max-h-full flex items-center justify-center">
          <img 
            src={TheRock}
            alt="TheRock" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="max-w-full max-h-full flex items-center justify-center">
          <img 
            src={Tedx} 
            alt="Tedx" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default ClubLogos;