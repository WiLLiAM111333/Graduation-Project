# Controller

### Controller är en abstrakt klass som används för att skapa routes på våran api proxy.

  - [Controller](#controller)
  - [Fält](#fält)
  - [Funktioner](#funktioner)
  - [buildURLQueries](#buildurlqueries)
  - [_mountMethod](#_mountmethod)
  - [_resCache](#_rescache)
  - [mount](#mount)

# Fält

| Access Modifier |     Name     |                            Type                            |
|-----------------|--------------|------------------------------------------------------------|
| private         | _cache       | [ResponseCache](./ResponseCache.md)                        |
| private         | _basePath    | string                                                     |
| private         | _router      | [Router](https://expressjs.com/en/4x/api.html#router)      |
| protected       | methods      | Array<[IControllerMethod](./IControllerMethod.md)>         |

---

# Funktioner

## buildURLQueries

**Access Modifier**: `protected`<br />
**Return Type**: `string`

**Parameters**:

| Name |                  Type                  |
|------|----------------------------------------|
| obj  | `{ [key: string]: string \| number }`  |

Funktionen omvandlar ett objekt till en sträng av parametrar till en URL. Exempel:

```ts
export class NewController extends Controller {
  private obj: { [key: string]: string | number };

  public constructor() {
    super('/new');

    this.obj = { a: 1, b: 2, c: 3, name: 'william' };

    const queryStr = this.buildURLQueries(this.obj); // "?a=1&b=2&c=3&name=william"
  }
}
```

Läs mer om URL Parametrar [här.](https://www.botify.com/learn/basics/what-are-url-parameters)

---

## _mountMethod

**Access Modifier**: `private`<br />
**Return Type**: `void`

**Parameters**:

|    Name    |                     Type                     |
|------------|----------------------------------------------|
| rawMethod  | [IControllerMethod](./IControllerMethod.md)  |

Funktionen använder sig av `rawMethod.method` parametern i små bokstäver med hjälp av [String.prototype.toLowerCase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) för att få ut rätt http metod
på `Controller._router` för `rawMethod.handler` att använda. `rawMethod.handler` är en funktion som kan användas av `Express` för att skapa en http handle på en viss url med en viss http metod.

Inget exempel eftersom det är en privat funktion som används i `Controller.mount`.

---

## _resCache

Access Modifier: `private` <br />
Return Type: [ControllerMiddlewareFunction](./ControllerMiddlewareFunction.md)

Funktionen sparar http svar från sega GET requests till andra API:er med hjälp av [ResponseCache](./ResponseCache.md). Ett exempel är skolmatens API. Där behöver jag få fram massor med ID nummer till olika saker innan jag kommer till det jag vill, menyn.

Följande sker varje gång en route med `cache: true` i sin konfiguration får en GET request:
  - Servern kollar sin cache för att se om det finns ett svar sparat för den routen.
  - Om det finns ett svar i cachen skickar den tillbaka det svaret.
  - Om det inte finns ett svar i cachen gör den sin request med sin `handler` funktion från sin route konfiguration
  (`Controller.routes`) och sparar sedan svaret den får i cachen.

---

## mount

**Access Modifier**: `public` <br />
**Return Type**: `void`

**Parameters**:

| Name |                           Type                           |
|------|----------------------------------------------------------|
| app  | [Application](https://expressjs.com/en/4x/api.html#app)  |

Funktionen kopplar `Controller`:n till express applikationen.

---
