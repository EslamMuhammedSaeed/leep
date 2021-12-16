import { executeSQL } from '@carto/react-api';

export async function getData({ credentials, opts,query }) {
  // const query = `
  // select name, gov_name,innovation_stage, sector from egypt_si_dataset_final_review_16112021
  // `;
  // connection = '';

  // const data = await executeSQL({ credentials, query, opts });
  const data = await executeSQL({ credentials, query, opts });
  return data;
}
