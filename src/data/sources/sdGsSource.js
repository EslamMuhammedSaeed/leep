import { MAP_TYPES } from '@deck.gl/carto';

const SD_GS_SOURCE_ID = 'sdGsSource';

const source = {
  id: SD_GS_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  data: `testing_dataset_for_sdgs_widget`,
};

export default source;
