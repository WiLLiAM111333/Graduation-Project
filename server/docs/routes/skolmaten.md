# Skolmaten

**Base URL**: `/skolmaten`

**Table of Contents**:

  - [menu](#menu)

Skolmaten har gjort en väldigt seg design på sin API så man måste skicka ut 4 requests för att få ut en meny. Därför använder dennas enda route `/menu` response caching.

---

## menu

[Skolmaten Controller](../../routes/skolmaten.ts) <br />

Konfiguration:

```js
{
  path: '/menu',
  handler: this._getMenuRequest(),
  method: 'GET',
  cache: true
}
```

När man skickar en GET request till `/skolmaten/menu` skickar man första gången en request till servern och 4 från servern till deras API. Andra gången skickar du en request till servern men ingen request till deras API eftersom [Controller](../controller/README.md) klassen has sparat din request i sin cache. Exempel Response:

```json
{
  "weeks": [
    {
      "year": 2016,
      "number": 46,
      "days": [
        {
          "date": 1479081600,
          "meals": [
            {
              "value": "Korvgryta, ris",
              "attributes": []
            },
            {
              "value": "Vegetarisk korvgryta, ris",
              "attributes": [1]
            }
          ]
        },
        {
          "date": 1479168000,
          "meals": [
            {
              "value": "Kycklingwok, matvete/ris",
              "attributes": []
            },
            {
              "value": "Bulgurpytt med bönor, kall sås",
              "attributes": []
            }
          ]
        },
        {
          "date": 1479254400,
          "items": [
            "Köttbullar, tomatsås, makaroner",
            "Minibouletter, sås, makaroner"
          ]
        }
      ]
    }
  ],
  "school": {
    "id": 4858239707512832,
    "name": "Kv. Staren",
    "URLName": "kv-staren",
    "imageURL": "https://lh3.googleusercontent.com/...",
    "district": {
      "id": 3001,
      "name": "Luleå kommun",
      "URLName": "lulea-kommun",
      "province": {
        "id": 5742415700819968,
        "name": "Norrbottens län",
        "URLName": "norrbottens-lan"
      }
    }
  },
  "bulletins": [
    {
      "text": "Dagligen serveras råkost, knäckebröd, ..."
    }
  ]
}
```
