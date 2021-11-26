import { MAP_TYPES } from '@deck.gl/carto';

const STARTUPS_SOURCE_ID = 'startupsSource';

const source = {
  id: STARTUPS_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  data: `Egypt Social Innovation Map`,
};

export default source;
