# Databas

Databa koden är skriven med [KnexJS](http://knexjs.org/) vilket är en ORM (Object Relational Mapper) vilket i en mer komplex
applikation hjälper dig koppla ihop avancerade relationer mellan tables i en SQL databas mycket enklare. Knex hjälper också med
att automatisera seeds, vilket är när man sätter i en del data i databasen som kan användas för att testa. Vi har *delvis*
en seedfil i vårat projekt men vi har inte suttit ner och gjort en fil med alla lärares `sign` och fulla namn. Vi har
däremot använt oss av deras funktionalitet för att skapa migrations med deras CLI verktyg vilket har varit väldigt smidigt.

Sjävla databasen är en installation av [MySQL Community Edition](https://dev.mysql.com/downloads/mysql/) och i den har vi
skapat en användare till vår applikation med tillräckliga privileges för att göra det den ska men inget mer. Det säkrar
applikationen en del, men vi har inte tid att göra säkerhets research så vi hoppade över det.

En knex applikation måste ha en så kallad `knexfile` för att kunna koppla sig mot databasen med det underliggande `mysql`
librariet som används för att koppla ihop knex med vår lokala installation av MySQL. Den används både av vår applikation och
av knex CLI verktyg.

- [Knexfile](./knexfile.md)
