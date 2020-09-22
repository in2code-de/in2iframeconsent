# in2iframeconsent

## Inhaltsverzeichnis

- [Einrichtung](Documentation/Einrichtung.md)
- [Frontend Toolchain](Documentation/Frontend.md)
- [Verwendung TYPO3](Documentation/TYPO3_Viewhelper.md)

## Erklärung
Mit unserem in2iframeconsent wird verhindert, dass IFrames ohne Zustimmung des Benutzer geladen werden. 

Wichtig hierbei ist, dass wir das laden von IFrames auch verhindern, wenn Javascript deaktiviert ist.

## Funktion
**IFrame Akzeptieren (einzeln):**
Wird ein IFrame akzeptiert, wird ein Cookie  mit dem namen "*iframeswitch*" gesetzt. In diesem Cookie wird die Domaine des aktuell akzeptierten Iframes gespeichert. 
  Anhand dieser Domain, werden auch alle IFrames freigeben, die von der selben Domain kommen. IFrames von einer anderen Domaine werden nicht Freigegeben. 
  
  Wird ein IFrame einer anderen Domaine akzeptiert, wird das gesetzte Cookie um die jeweilige Domain erweitert, und gibt dementsprechend auch die IFrames frei, welche von der neu gesetzten Domaine kommen.
  
**IFrame Akzeptieren (alle):**
Das in2iframeconsent verfügt über eine *enableAll()*-Funktion. Mit dieser Funktion können, z.b. über unser Cookie-Modal, gleichzeitig alle IFrames auf der Website freigeben werden.  (Eine Beschreibung hierfür ist zu finden unter [Einrichtung](Documentation/Einrichtung.md) -> **enableAll()-Funktion Bereitstellen**.)

# Change Log
## [2.0.0] - 2020-04-17
  
### !!! BREAKING CHANGE!!!!!

### Changed
  
- [in2iframeconsent.js](src/Private/JavaScripts/in2iframeconsent.js)

  Das resultat von IFrameswitch() wird nun nicht mehr in einer Variable gespeichert, sondern in "window".
  
  [Einrichtung](Documentation/Einrichtung.md)
  
  Der Aufruf der enableAll()-Funktion, z.b. über das Cookie-Modal hat sich, geändert.

## [2.0.1] - 2020-04-20

### Added

 Beim anlegen eines Cookies, wird nun über den Code die aktuelle Domaine dem Cookie hinzugefügt. 
 
 Normalerweise geschieht dies automatisch beim setzen eines Cookies über "document.cookie", nur lässt sich hiermit ein schon gesetzes Cookie über unser Cookie-Modal nicht mehr löschen.
  
