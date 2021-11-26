import { MAP_TYPES } from '@deck.gl/carto';

const STARTUPS7_SOURCE_ID = 'startups7Source';

const source = {
  id: STARTUPS7_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  data: `governorate_boundary_region`,
};

export default source;
