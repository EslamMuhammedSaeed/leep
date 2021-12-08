import { MAP_TYPES } from '@deck.gl/carto';

const DEVELOPMENT_SOURCE_ID = 'developmentSource';

const source = {
  id: DEVELOPMENT_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  data: `development_data_dataset_final_review_12_2_2021`,
};

export default source;
