import { Knex } from 'knex';
import { join } from 'path';

export default async (): Promise<Knex.Config> => {
  try {
    const dotenv = await import('dotenv')
    dotenv.config({ path: join(__dirname, '..', '..', '.env') })

    const defaults = {
      client: 'mysql',
      migrations: {
        directory: process.env.KNEX_MIGRATIONS_DIR || join(__dirname, '..', '..', 'migrations'),
        loadExtensions: ['.js']
      },
      seeds: {
        directory: process.env.KNEX_SEEDS_DIR || join(__dirname, '..', '..', 'seeds'),
        loadExtensions: ['.js']
      },
      pool: {
        min: (process.env.KNEX_POOL_MIN || 0) as number,
        max: (process.env.KNEX_POOL_MAX || 7) as number
      }
    }

    const knexCFG: { [key: string]: Knex.Config } = {
      production: {
        ...defaults,
        connection: {
          database: process.env.KNEX_PROD_DB,
          host: process.env.KNEX_PROD_HOST,
          password: process.env.KNEX_PROD_PASSWORD,
          user: process.env.KNEX_PROD_USER
        }
      },
      development: {
        ...defaults,
        connection: {
          database: process.env.KNEX_DEV_DB,
          host: process.env.KNEX_DEV_HOST,
          password: process.env.KNEX_DEV_PASSWORD,
          user: process.env.KNEX_DEV_USER
        }
      }
    }

    return knexCFG[process.env.NODE_ENV || 'development'];
  } catch (err) {
    throw err;
  }
}