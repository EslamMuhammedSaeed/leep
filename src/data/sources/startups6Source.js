import { MAP_TYPES } from '@deck.gl/carto';

const STARTUPS6_SOURCE_ID = 'startups6Source';

const source = {
  id: STARTUPS6_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  data: `copy_of_1social_innovation_curated_data_set_july_2020a`,
};

export default source;
