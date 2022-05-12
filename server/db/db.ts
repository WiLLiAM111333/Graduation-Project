import knexFN, { Knex } from 'knex';
import getKnexCFG from './knexfile';

let db: Knex;

(async () => {
  try {
    const cfg = await getKnexCFG()
  
    db = knexFN(cfg);
  } catch (err) {
    throw err;
  }
})();

export { db };