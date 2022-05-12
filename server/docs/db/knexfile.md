# Knexfile

Knexfilen används för att ge en konfiguration för hur knex ska koppla ihop sig till din databas och även hur den ska
hantera migrations och seeds. Denna fil används både av din applikation och när du använder knex CLI verktyg. När vi hade
en normal knexfil med bara ytlig konfiguration fick vi problem med att deras CLI verktyg inte laddade in våra environment
variables ordentligt vilket vi spårade till att den läste på fel path så vi skrev en async funktion som använde sig av `import`
funktionen och tar en path till `.env` filen vilket håller alla våra environment variables för att koppla sig till databasen.

**Så här ser våran knexfile ut**:

Allt går att konfigurera med enviornment variables men det finns defaults för det man kan ge defaults till utan att ge iväg
för mycket information på github som till exempel lösenord osv.

```ts
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
        max: (process.env.KNEX_PPOL_MAX || 7) as number
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
```
