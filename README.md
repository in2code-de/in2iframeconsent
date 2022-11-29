## Was ist in2cookiemodal?

in2cookiemodal ist eine von in2code entwickelte Consent-Management-Lösung um Cookies/JavaScript erst nach Zustimmung
eines Seitenbesuchers zu laden.

### Funktionsweise

in2cookiemodal ist nicht direkt ein Blocker für bereits existierende Skripte auf einer Seite, sondern eher ein
"Skript-Injektor", das heißt dass die Skripte erst im Nachhinein eingesetzt werden und nicht über JavaScript-Tricks/Hacks
vom Laden abgehalten werden. Das ist die beste Möglichkeitkeit sicherzugehen, dass keine ungewollten Cookies auf der Seite
platziert werden.

## Installation

### NPM

Seit Version 2.3.0-dev besteht die Möglichkeit, in2cookiemodal auch über npm als ES-Modul zu installieren.

**Bevor das Paket per NPM installiert werden kann, müssen jedoch die folgenden Schritte ausgeführt werden:**

#### 1. Gitlab-ci.yml modifizieren

```yml
frontend:build:
    stage: frontend
    image: node:16
    before_script:
        # erlaubt das Installieren von in2cookiemodal über NPM
        - npm config set -- '//gitlab.in2code.de/api/v4/projects/321/packages/npm/:_authToken' "${CI_JOB_TOKEN}"
```

#### 2. Docker-compose Datei modifizieren
Es muss sichergestellt werden, dass die lokale .npmrc Datei in den Node Docker Container gemounted wird.
Dies kann über folgenden Befehl erreicht werden:

```yml
services:
    node:
        image: ${NODEIMAGE}
        volumes:
            # Mounted .npmrc Datei in node container
            - $HOME/.npmrc:/home/node/.npmrc
```

#### 3. Gitlab Auth-Token in lokale .npmrc eintragen
##### 3.1 NPM lokal installiert:
```bash
npm config set @in2code-team:registry https://gitlab.in2code.de/api/v4/projects/321/packages/npm/

npm config set -- '//gitlab.in2code.de/api/v4/projects/321/packages/npm/:_authToken' "<GITLAB_AUTH_TOKEN>"
```

##### 3.2 NPM lokal nicht installiert:
```bash
echo "@in2code-team:registry=https://gitlab.in2code.de/api/v4/projects/321/packages/npm/" >> ~/.npmrc

echo "//gitlab.in2code.de/api/v4/projects/321/packages/npm/:_authToken=<GITLAB_AUTH_TOKEN>" >> ~/.npmrc
```

#### 4. Paket per NPM installieren

```shell
$ npm i @in2code-team/in2cookiemodal
```

Danach kann man in dem Projekt dann folgendes JavaScript nutzen:

```js
import In2cookieModal from '@in2code-team/in2cookiemodal';
import 'in2cookiemodal-configuration';

new In2cookiemodal().init();
window.in2cookiemodal.show();
```

## Vorbereitung

Bevor in2cookiemodal auf einer Seite eingebunden bzw. konfiguriert werden kann, sind folgende Prerequisiten benötigt:

* Ein Cookie-Audit (diesen könnt ihr per Hand oder mit einem Tool wie [cookieradar](https://gitlab.in2code.de/pixeldesu/cookieradar) erledigen)
* Das Wissen, welche Skripte welche Cookies einbinden
* Eine grobe Definition der Kategorien in denen ihr die Cookies gruppieren wollt

## Konfiguration

Habt ihr alle relevanten Informationen, so kann in2cookiemodal konfiguriert werden, wir arbeiten uns hier von innen nach außen vor.

### Standort und Struktur

Die Konfiguration muss vor der Initialisierung von in2cookiemodal (entweder dem `script`-Tag, oder dem `init()`-Aufruf) in dem Standort
`window.in2cookiemodalConfiguration` platziert werden.

> **Info**: In einer späteren Version von in2cookiemodal wird es möglich sein einen anderen Standort für die Konfiguration innerhalb von `window`
zu definieren.

**Struktur der Konfiguration:**

```typescript
interface Configuration {
  revision?: string;
  lang?: string;
  providers?: ProviderMap;
  i18n?: LanguageMap;
  frontend: FrontendConfiguration;
}
```

### Revision

Es besteht die Möglichkeit optional eine `revision`-Konfiguration mitzugeben. Sobald diese gesetzt wird, wird in dem `in2cookiemodal-selection`-Cookie
dieser Wert mitgespeichert. Wird `revision` nun zu einem späteren Zeitpunkt verändert und bei einem erneuten Seitenaufruf stimmt die Konfiguration nicht
mit dem Wert aus dem Cookie überein, so wird das Modal erneut angezeigt.

### Provider

Ein Provider (zu deutsch _Anbieter_) ist ein Dienst/Firma/etc. von dem Cookies/Skripte ausgehen, zum Beispiel Google Analytics, Matomo, usw.

```typescript
interface Provider {
  name: string;
  cookies: string[];
  cookieOptions?: CookieOptionsMap;
  scripts?: Script[];
}
```

#### name

* **Typ:** `string`

Der Name des Providers.

**Beispiel:** Google Analytics

#### cookies

* **Typ:** `string`-Array

Eine Liste von Cookie-Namen die diesem Provider zugeordnet sind.

**Beispiel:**

```js
[
  '_pk_id',
  '_pk_ses',
  '_pk_test.cookie'
]
```

#### cookieOptions

* **Typ:** `CookieOptionsMap`
* **optional**

```typescript
interface CookieOptionsMap {
  [cookie: string]: CookieOptions;
}

interface CookieOptions {
  useTopDomain?: boolean;
}
```

Ein Objekt mit einem Mapping von Cookies und Zusatzoptionen. Die aktuell einzige verfügbare Zusatzoption ist `useTopDomain`.

**`useTopDomain (boolean)`:** Konfigurations-Option mit der festgelegt werden kann, dass die `domain` des Cookies nicht der direkte Hostname ist,
sondern die sogenannte Top-Domain (Beispiel: Die Top-Domain von `https://intranet.in2code.de` ist `.in2code.de`)

**Beispiel:**

```js
{
  '_pk_id': {
    useTopDomain: false
  }
}
```

#### scripts

* **Typ:** `Script`-Array
* **optional**

```typescript
interface Script {
  tag: string;
  options: { [key: string]: any }
  position: ScriptPosition;
}

enum ScriptPosition {
  HeadStart = 'head:start',
  HeadEnd = 'head:end',
  BodyStart = 'body:start',
  BodyEnd = 'body:end'
}
```

Eine Liste von Skripten, die bei Akzeptieren der Kategorie von der dieser Provider ein Teil ist, in die Seite eingefügt werden.

Man ist übrigens nicht dazu gezwungen `script`-Tags einzubinden auch wenn die Option generell so heißt, mit der
[`buildElement`](https://gitlab.in2code.de/in2code-Team/in2cookiemodal/-/blob/master/src/utilities/buildElement.ts)-Funktion
die hierfür im Hintergrund genutzt wird können alle möglichen HTML-Tags in die Seite geladen werden.

**Beispiel:**

```js
{
  tag: 'script',
  options: {
    innerHTML: 'console.log("Hallo Welt vom Ende des <head>-Tags!")'
  },
  position: 'head:end'
}
```

### Provider-Kategorien (providers)

Mehrere Provider bilden zusammen eine Kategorie:

```typescript
interface ProviderMap {
  [category: string]: Provider[];
}
```

**Beispiel:**

```js
{
  'analytics': [
    {
      name: 'Google Analytics',
      // ...
    },
    {
      name: 'Matomo',
      // ...
    },
  ]
}
```

### Mehrsprachigkeit (i18n)

Mehrsprachigkeit ist ein großer Bestandteil von in2cookiemodal. Generell für die Texte und für eigene Features
die komplett über Übersetzungen gesteuert werden.

#### Wie funktioniert die Sprachenauflösung?

Es gibt zwei Wege mit denen eine Seitensprache festgemacht wird:

* Über die `lang`-Konfigurationsoption. Diese ist aber als Fallback gedacht, falls Option 2 nicht in Frage kommt.
* Das `html` `lang`-Attribut
  * Wird eine Sprache gefunden, die dem kompletten `lang`-Attribut übereinstimmt, so wird diese bevorzugt.
  * Hier wird geprüft ob ein `-` oder `_` vorhanden ist, dann wird danach gesplittet und es wird geprüft ob einer der
  Teile als definierte Sprache vorhanden ist, diese wird dann gewählt.

**Beispiele:**

Sprache in der Konfiguration definiert, nicht im HTML-Tag:

```js
// index.html
<html>
...
</html>

// config
in2cookiemodalConfiguration = {
  lang: 'en'
}

// interne Sprachenauflösung
i18nManager.getSiteLanguage()
// => 'en'
```

Sprache in der Konfiguration definiert und im HTML-Tag (lang-Attribut > Konfiguration):

```js
// index.html
<html lang="de">
...
</html>

// config
in2cookiemodalConfiguration = {
  lang: 'en'
}

// interne Sprachenauflösung
i18nManager.getSiteLanguage()
// => 'de'
```

#### Konfiguration (i18n[lang])

Die Festlegung unterschiedlicher Sprachen ist relativ simpel. Im Root der Konfiguration befindet sich das `i18n`-Objekt,
und jeder Schlüssel/Key davon ist die Definition einer Sprache, wobei die jeweiligen Unterobjekte dieser Schlüssel dann
die Texte enthalten.

**Beispiel:**

```js
{
  en: {
    heading: 'Privacy Settings',
  },
  de: {
    heading: 'Datenschutzeinstellung'
  }
}
```

#### Besondere Sprachobjekte

> **Info:** Diese Sprachobjekte werden dynamisch nach dem Rest der Konfiguration auf Basis des Standardlayouts abgefragt.
Wird das Layout verändert so kann es auch sein, dass diese Funktionalität nicht mehr greift.

##### categories

Die `categories`-Sprachobjekte sind Definitionen für die Provider-Kategorien, damit sind die ersten Keys der Objekte des
`providers`-Objekts gemeint.

**Beispiel:**

```js
// config
in2cookiemodalConfiguration = {
  providers: {
    essential: [...],
    analytics: [...]
  },
  i18n: {
    en: {
      categories: {
        essential: 'Essential',
        analytics: 'Analytics'
      }
    },
    de: {
      categories: {
        essential: 'Essentiell',
        analytics: 'Analytics'
      }
    },
  }
}

// interne Sprachenauflösung

// englisch (en)
i18nManager.get('categories////essential')
// => 'Essential'

// deutsch (de)
i18nManager.get('categories////essential')
// => 'Essentiell'
```

##### links

Das `links`-Objekt wird dafür genutzt Links im Footer von in2cookiemodal zu generieren. Diese Links sind in den Sprachen
konfigurierbar, da es sein kann das manche Zielsprachen die gewünschten Seiten nicht enthalten, oder andere Unterschiede.

`url` und `text` sind selbsterklärende Optionen, `highlight` kann genutzt werden um den Link in der Brandcolor
hervorzuheben.

```typescript
interface LinkOptions {
  url: string;
  text: string;
  highlight: boolean;
}
```

**Beispiel:**
```js
// config
in2cookiemodalConfiguration = {
  i18n: {
    en: {
      links: [
        {
          url: '/imprint',
          text: 'Imprint',
          highlight: false
        }
      ]
    },
    de: {
      links: [
        {
          url: '/impressum',
          text: 'Impressum',
          highlight: false
        }
      ]
    },
  }
}
```

##### cookies

In dem `cookies`-Sprachobjekt befinden sich die Texte für die unterschiedlichen Cookies. Die sich in der ersten Ebene
befindenden Keys sind die Namen von Cookies, die in dem `cookies`-Array innerhalb von Providern definiert werden.

Die Objekte auf diesen Keys enthalten 2 Werte, `lifetime` und `use` in denen in Textform beschrieben werden kann, was
die Lebensdauer und der Nutzen des jeweiligen Cookies ist.

**Beispiel:**

```js
// config
in2cookiemodalConfiguration = {
  i18n: {
    en: {
      cookies: {
        '_pk_id': {
          use: 'Unique Matomo User Session ID',
          lifetime: 'Session'
        }
      }
    },
    de: {
      cookies: {
        '_pk_id': {
          use: 'Einzigartige Matomo-Session-ID',
          lifetime: 'Browsersitzung'
        }
      }
    },
  }
}
```

### Aussehen anpassen (frontend)

Ab Version 2.0.0 von in2cookiemodal gibt es nun weitere Möglichkeiten das Aussehen über die Konfiguration zu beeinflussen.

#### variables

> **Info:** Diese Konfiguration ist nur relevant für Browser die keine CSS-Variablen unterstützen

In dem `variables`-Objekt der Frontend-Konfiguration können für Browser die keine CSS-Variablen unterstützt werden
die Farbwerte fest definiert werden.

**Beispiel:**

```js
{
  variables: {
    'in2-modal-brand-color': 'green'
  }
}
```

#### highlight

> **Info:** Diese Konfiguration ist Template-spezifisch und kann, wenn sie im Zieltemplate nicht eingebunden ist
auch nicht funktionieren.

In dem `highlight`-Objekt kann definiert werden, welcher der Buttons zum Bestätigen des in2cookiemodal farblich
hervorgehoben werden soll.

```typescript
interface HighlightOptions {
  button: {
    accept: boolean;
    save: boolean;
  }
}
```

**Beispiel:**

```js
{
  highlight: {
    button: {
      accept: true,
      save: false
    }
  }
}

// "Alle akzeptieren"-Button hervorgehoben
// "Speichern/Schließen"-Button nicht hervorgehoben
```

#### rootNodeSelector

In dieser Konfigurationsvariable kann ein Selektor definiert werden der dafür genutzt wird in2cookiemodal anzuzeigen oder
zu verstecken. Wie der Variablen-Name selbst schon verrät sollte man hierbei die Root-Node (das äußerste Element des Modals)
selektieren.

Der Default-Wert in in2cookiemodal ist `[data-in2-modal-root-node]`.

#### events

Um dem Layout Funktionalität zu geben, müssen Events nach dem Rendering von Templates angehängt werden. Diese können in dem
`events`-Array definiert werden.

```typescript
interface EventDef {
  type: string;
  queryAll?: string;
  query?: string;
  handler: EventListenerOrEventListenerObject;
}
```

`type` ist der Typ eines Events (bspw. `click`). Mit `query`/`queryAll` kann eine Query definiert werden um das Event auf
eines oder mehrere Element zu setzen. `handler` ist dann die JavaScript-Funktion die aufgerufen wird sobald das Event getriggert
wird.

**Beispiel:**

```js
{
  events: [
    {
      type: 'click',
      query: 'button',
      handler: function(e) { console.log('Hallo Welt, der Button wurde geklick!'); }
    }
  ]
}
```

### Templating (frontend.templates)

Seit Version 2.0.0 gibt es die Möglichkeit das Layout von in2cookiemodal mit eigenen Templates anzupassen.

#### Definition

Templates können in dem Objekt `templates` in der Frontend-Konfiguration hinterlegt werden. Der Key ist hierbei
der Templatename, und der Wert ist das Template selbst.

Simples Beispiel:

```js
{
  templates: {
    'hello_world': '<h1>Hello World!</h1>'
  }
}
```

Das Grundtemplate, das immer von in2cookiemodal zuerst geladen wird heißt `base`.

Vordefinierte Templates und andere können einfach überschrieben werden in dem ihr ein Template auf den gleichen Key in
`templates` legt.

#### Syntax

Für das Template-Parsing wird die `_.template()`-Funktion von
[lodash](https://lodash.com/) verwendet.

Wie Variablen und Conditions verwendet werden können kann in der [offiziellen Dokumentation](https://lodash.com/docs/4.17.15#template)
nachgelesen werden. Als Beispiele können auch die Templates in `src/templates/` im in2cookiemodal-Projekt genutzt werden.

#### Helper (i18n, Partials, etc.)

Damit Teile der Konfiguration in den Templates genutzt werden können, werden einige Funktionen in alle Templates injiziert.

##### i18n

`i18nManager` ist als Instanz `i18n` in den Templates verfügbar, so können Übersetzungen in den Templates genutzt werden:

```html
<%= i18n.get('heading') %>
```

##### Partials

Die Instanz des `TemplateRenderer` die für alle Templates genutzt wird, ist als `tmpl` in den Templates verfügbar, damit
können dann beispielweise Partials gerendert werden.

```html
<%= tmpl.render('checkbox', { someData: "hallo welt" }) %>
```

##### Helper-Methoden

Es gibt eine Klasse `TemplateHelper` die als `th` in den Templates verfügbar ist. Diese bietet einige Funktionen einige
Konfigurationsobjekte simpler in den Templates zu nutzen.

Der Code hierfür befindet sich in [`src/features/helper.ts`](https://gitlab.in2code.de/in2code-Team/in2cookiemodal/-/blob/develop/src/features/helper.ts).

```html
<% th.getProviderCategoryNames().forEach(function (category) { %>
    <%= tmpl.render('checkbox', { category: category }) %>
<% }) %>
```
