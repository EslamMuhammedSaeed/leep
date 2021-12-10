import StartupsLayer from './StartupsLayer';
import Startups2Layer from './Startups2Layer';
import Startups3Layer from './Startups3Layer';
import Startups4Layer from './Startups4Layer';
import Startups5Layer from './Startups5Layer';
import Startups6Layer from './Startups6Layer';
import Startups7Layer from './Startups7Layer';
import Startups8Layer from './Startups8Layer';
import Startups9Layer from './Startups9Layer';
import Startups10Layer from './Startups10Layer';
import Startups11Layer from './Startups11Layer';
import BasemapLayer from './BasemapLayer';
import PovertyLayer from './PovertyLayer';
import UnemploymentLayer from './UnemploymentLayer';
import NoOfHospitalsLayer from './NoOfHospitalsLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    StartupsLayer(),
    Startups2Layer(),
    Startups3Layer(),
    Startups4Layer(),
    Startups5Layer(),
    Startups6Layer(),
    Startups7Layer(),
    Startups8Layer(),
    Startups9Layer(),
    
    Startups11Layer(),
    BasemapLayer(),
    PovertyLayer(),
    UnemploymentLayer(),
    Startups10Layer(),
    
    
    
    NoOfHospitalsLayer(),
    // [hygen] Add layer
  ];
};
