import { MAP_TYPES } from '@deck.gl/carto';

const STARTUPS2_SOURCE_ID = 'startups2Source';

const source = {
  id: STARTUPS2_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  data: `LEEP Community Map`,
};

export default source;
