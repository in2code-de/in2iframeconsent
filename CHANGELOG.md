# Change Log
## [2.0.0] - 2020-04-17

### !!! BREAKING CHANGE!!!!!

### Changed

- [index.ts](src/index.ts)

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
