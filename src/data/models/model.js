import { executeSQL } from '@carto/react-api';

export async function getData({ credentials, opts }) {
  const query = `
  select governorate, job_title from copy_of_2leep_community_map_july_2020
  `;
  // connection = '';

  // const data = await executeSQL({ credentials, query, opts });
  const data = await executeSQL({ credentials, query, opts });
  return data;
}
