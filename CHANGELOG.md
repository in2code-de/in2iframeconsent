# Changelog

## [4.0.0]
* Rewrite in2iframeconsent with web components
* Switch to Vite for local development

## [3.0.16] - 2022-11-01
* Remove generic styling from consent box

## [3.0.16] - 2022-06-01
* Update npm dependencies

## [3.0.13] - 2022-05-05
* Downgrade vuepress to 2.0.0-beta.35, because with newer version the documentation breaks.

## [3.0.12] - 2022-05-05
* Change distribution filename to in2iframeconsent.js

## [3.0.9] - 2021-12-03
* Bump prismjs from 1.26.0 to 1.27.0 [SECURITY UPDATE]

## [3.0.8] - 2021-12-03
* Bump nanoid from 3.1.30 to 3.2.0 [SECURITY UPDATE]

## [3.0.5] - 2021-12-03
* Simplify release process for npmjs.com and GitHub

## [3.0.4] - 2021-12-03
* Publish new version on npmjs.com

## [3.0.0] - 2021-11-15
* in2iframeconsent is now available on npmjs.com ( [Download](("https://www.npmjs.com/package/in2iframeconsent")) )
* in2iframeconsent was rewritten in Typescript
* Documentation rewrite
* ESLINT implementation
* in2iframeconsent now exports multiple js file types
* Port CSS files to .scss
* Change project file structure
* Cookie duration was decreased from 10 years to 3 months

**IMPORTANT:** in2iframeconsent is fully compatible with old implementations.

## [2.0.0] - 2020-04-17

### !!! BREAKING CHANGE!!!!!

### Changed

- [index.ts](../src/index.ts)

  Das resultat von IFrameswitch() wird nun nicht mehr in einer Variable gespeichert, sondern in "window".

  Der Aufruf der enableAll()-Funktion, z.b. über das Cookie-Modal hat sich, geändert.

## [2.0.1] - 2020-04-20

### Added

Beim anlegen eines Cookies, wird nun über den Code die aktuelle Domaine dem Cookie hinzugefügt.

Normalerweise geschieht dies automatisch beim setzen eines Cookies über "document.cookie", nur lässt sich hiermit ein schon gesetzes Cookie über unser Cookie-Modal nicht mehr löschen.

## [2.0.2] - 2021-06-25

### Changed
Die Default Cookiedauer war leicht unpräzise, dies wurde jetzt gefixed.

## [2.0.3] - 2021-10-19

### Added

Samesite = None und Secure attribut wurden dem Cookie hinzugefügt.

## [2.0.4] - 2021-10-20

### Changed

Cookie expirationDate wurde falsch berechnet, dies wurde jetzt gefixed.  
