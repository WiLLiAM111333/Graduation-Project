# Scheman

**Smått och gott**:

| HTTP Method |                  URL                  |              Kort Beskrivning              |
|-------------|---------------------------------------|--------------------------------------------|
| GET         | `/schedules/teachers`                 | [här](#teachers)                           |
| GET         | `/schedules/list`                     | Skickar en lista av alla scheman i mappen. |
| DELETE      | `/schedules/teachers/delete/:teacher` | Tar bort den angivna läraren.              |
| POST        | `/schedules/teachers/upload`          | Laddar upp ett nytt schema till servern.   |

**Base URL**: `/schedules`

## Table of Contents

  - [/teachers](#teachers)
  - [/teachers/upload](#teachersupload)
  - [/teachers/list](#teacherslist)
  - [/teachers/teacher](#teachersteacher)

## /teachers

**URL**: `/schedules/teachers`
**Method**: `GET`

Denna route använder databasen för att svara med den fil som hittas. Databas svaret har då med `sign`, `full_name` och `path` men HTTP svaret skickar bara filen som finns på `path`.

**Konfiguration**:

```js
{
  path: '/teachers/:teacher',
  method: 'GET',
  handler: this._handleGetTeacher()
},
```

---

## /teachers/upload

Det går att ladda upp hur mycket data man vill om mitt library inte har en åtgärd emot det inbyggt. Jag känner inte
att det är nödvändigt för oss att spendera tid på säkerheten av applikationen när vi gör en prototyp av det fulla
projektet som säkert kommer utföras.

**URL**: `/schedules/teachers/upload`
**Method**: `POST`

Denna route låter dig lägga till nya scheman i mappen. Man måste lägga upp en fil i sin request och så sparas den med det namnet du angav. **MÅSTE VARA JPG**

**Konfiguration**:

```js
{
  path: '/teachers/upload',
  method: 'POST',
  handler: [fileUpload(), this._handlePostSchedule()]
}
```

---

## /teachers/list

**URL**: `/schedules/teachers/list`

Denna route svarar med en array av namn på alla filer i mappen som `/teachers` använder med `static` middleware.

**Konfiguration**:

```js
{
  path: '/teachers/list',
  method: 'GET',
  handler: this._listTeacherSchedules()
}
```

---

## /teachers/teacher

**URL**: `/schedules/teachers/delete/:teacher`
**Method**: `DELETE`

**Konfiguration**:

Denna url tar bort ett schema från mappen. Delen där det står `:teacher` betyder att man kan ange en lärares initialer på den plattsen i URL:en, t.ex `/schedules/teachers/delete/ahm`.

```js
{
  path: '/teachers/:teacher',
  method: 'DELETE',
  handler: this._handleDeleteSchedule()
}
```
