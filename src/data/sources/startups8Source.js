import { MAP_TYPES } from '@deck.gl/carto';

const STARTUPS8_SOURCE_ID = 'startups8Source';

const source = {
  id: STARTUPS8_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  data: `governorate_boundary_region`,
};

export default source;
