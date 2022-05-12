# Server

  - [Controller](./controller/README.md)
  - [Routes](./routes/README.md)
  - [ResponseCache](./responseCache/README.md)
  - [Databas](./db/README.md)

En simpel webbserver som fyller rollen av en API Proxy Server för att hantera secrets mellan skärmarna. I vårat projekt finns det bara en skärm men det finns planer för att sätta up 2 eller 3 till, så jag tänkte att jag kunde sätta upp en api proxy med tokens och grejer på servern. Det tillåter oss att ha en cache på servern som håller http svar från t.ex skolmatens API till alla skärmar uppsatta. Det underlättar också genom att inte behöva sitta och skicka över en fil med api tokens och grejer via något protokoll.

Servern är skriven i [TypeScript](https://www.typescriptlang.org/) och [NodeJS](https://nodejs.org/en/). Jag använde mig av:
  - [Express](https://www.npmjs.com/package/express) för att sätta upp en REST API.
  - [Dotenv](https://www.npmjs.com/package/dotenv) för att hantera api tokens på ett säkert sätt.
  - [Cors](https://www.npmjs.com/package/cors) för att hantera cors.
  - [Helmet](https://www.npmjs.com/package/helmet) för att fixa med http headers från ett säkerhetsperspektiv.
  - [Node-Fetch](https://www.npmjs.com/package/node-fetch) för att hjälpa mig skicka http requests till olika API:er.
  - [Express-Fileupload](https://www.npmjs.com/package/express-fileupload) för att hjälpa med uppladdning av filer.
  - [knex](https://www.npmjs.com/package/knex) en ORM för att prata med databasen och hantera migrations/seeding med ett terminal verktyg.
  - [mysql](https://www.npmjs.com/package/mysql) bara installerat för att [KnexJS](https://www.npmjs.com/package/knex) ska kunna prata med MySQL på servern.

Om man kollar i `package.json` filen ser man att jag har några libraries som börjar med `@types`. Se [här](https://github.com/DefinitelyTyped/DefinitelyTyped) för en fullständig förklaring. Men för enkelhetens skull är det bara nödvändigt för TypeScript koden och inte den kompilerade JavaScript koden som körs i produktions versionen av server applikationen.
