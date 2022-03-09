import { MAP_TYPES } from '@deck.gl/carto';

const STARTUPS10_SOURCE_ID = 'startups10Source';

const source = {
  id: STARTUPS10_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  data: `select name,gov_name,sector,sdgs,innovation_type,innovation_stage,the_geom_webmercator from egypt_si_dataset_final_review_16112021`,
};

export default source;
