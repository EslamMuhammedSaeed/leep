import { MAP_TYPES } from '@deck.gl/carto';

const STARTUPS10_SOURCE_ID = 'startups10Source';

const source = {
  id: STARTUPS10_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  data: `egypt_si_dataset_final_review_16112021`,
};

export default source;
