import { MAP_TYPES } from '@deck.gl/carto';

const POLLUTION_SOURCE_ID = 'pollutionSource';

const source = {
  id: POLLUTION_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  data: `dataset_pollution_toxic_concentrations`,
};

export default source;
