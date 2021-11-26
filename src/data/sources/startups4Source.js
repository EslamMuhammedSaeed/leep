import { MAP_TYPES } from '@deck.gl/carto';

const STARTUPS4_SOURCE_ID = 'startups4Source';

const source = {
  id: STARTUPS4_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  data: `copy_of_1social_innovation_curated_data_set_july_2020a`,
};

export default source;
