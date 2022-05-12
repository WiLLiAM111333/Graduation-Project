# ResponseCache

ResponseCache är en klass som används av [Controller](../controller/Controller.md) klassen för att spara responses i en cache och skicka tillbaka dem mycket snabbare nästa gång ifall det tar lång tid första gången. Den sparar bara GET requests.

Följande sker varje gång en route med `cache: { enabled: true }` i sin konfiguration får en GET request:
  - Servern kollar sin cache för att se om det finns ett svar sparat för den routen.
  - Om det finns ett svar i cachen skickar den tillbaka det svaret.
  - Om det inte finns ett svar i cachen gör den sin request med sin `handler` funktion från sin route konfiguration
  (`Controller.routes`) och sparar sedan svaret den får i cachen.