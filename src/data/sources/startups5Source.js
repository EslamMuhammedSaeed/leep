import { MAP_TYPES } from '@deck.gl/carto';

const STARTUPS5_SOURCE_ID = 'startups5Source';

const source = {
  id: STARTUPS5_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  // data: "SELECT cartodb_id, first_name, the_geom_webmercator FROM copy_of_2leep_community_map_july_2020 WHERE governorate ='Cairo'",
  // data: "select cartodb_id, store_id, storetype, city, revenue, address, the_geom_webmercator from retail_stores WHERE state ='MA'",

  // type:'sql'
  // data: `copy_of_2leep_community_map_july_2020 WHERE governorate ='Cairo'`,

  // data: `copy_of_2leep_community_map_july_2020`,
  data: `egypt_si_dataset_final_review_16112021`,
  // data: `governorate_boundary_region`,
  
};

export default source;
