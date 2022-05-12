# Gymnasiearbete 2022 Digital Signage System

## **William 1 2**

**Handledare: Den Bästa** <br />
**Start-datum: 10/03/2022** <br />
**Slut-datum: 07/05/2022** <br />

Vårat projekt har gått ut på att göra ett digital signage system vilket innebär att skapa funktionalitet som gör det lättare
att ta sig runt innomhus med bekvämlighets funktionalitet som t.ex matsedel och scheman. Vi har haft problem hela vägen med
alla möjliga saker som prissättning på wayfinder services, schemaservicen för elever och personal men matsedeln har gått bra
från början. Vi har löst följande problem på följande sätt:

- Wayfinder blev inte löst över huvud taget tills absolut sista sekund och vi hade inte tid att fixa det.
- Schemaservicen har vi löst genom att göra en statisk databas med lärar-scheman i sista sekund.

Vi har lärt oss mycket om hur man kan koppla ihop en backend till en statisk html/css/js frontend genom fetch och väldigt
mycket inom simpel deployment av en webbapp som kräver att en backend körs. Nu är den installerad på samma maskin som
vår frontend kör vilket inte hade varit så det fungerade om det var ett riktigt digital signage system med skärm på
varje våningsplan. Då hade det varit en separat dator som kör vår backend med sin egen ip address och säkert någon form av
DNS för att sätta den på en lokal url i domänen för Stockholm Stads region samt skolans IT att hantera.

Servern jag skrev är inte jätte skalbar men det går rätt fort att byta ut vad jag gjorde till en ASP.NET server eller något liknande eftersom det mesta jag skrev var logik för OOP kontrollerna och väldigt lite logik som används av applikationen i sig.

Dokumentation till servern hittar man [här](./server/docs/README.md)
