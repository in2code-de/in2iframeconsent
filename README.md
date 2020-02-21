# in2iframeconsent

## Inhaltsverzeichnis

- [Einrichtung](Documentation/Einrichtung.md)

##Erklärung
Mit unserem in2iframeconsent wird verhindert, dass IFrames ohne Zustimmung des Benutzer geladen werden. 

Wichtig hierbei ist, dass wir das laden von IFrames auch verhindern, wenn Javascript deaktiviert ist.

##Funktion
**IFrame Akzeptieren (einzeln):**
Wird ein IFrame akzeptiert, wird ein Cookie  mit dem namen "*iframeswitch*" gesetzt. In diesem Cookie wird die Domaine des aktuell akzeptierten Iframes gespeichert. 
  Anhand dieser Domain, werden auch alle IFrames freigeben, die von der selben Domain kommen. IFrames von einer anderen Domaine werden nicht Freigegeben. 
  
  Wird ein IFrame einer anderen Domaine akzeptiert, wird das gesetzte Cookie um die jeweilige Domain erweitert, und gibt dementsprechend auch die IFrames frei, welche von der neu gesetzten Domaine kommen.
  
**IFrame Akzeptieren (alle):**
Das in2iframeconsent verfügt über eine *enableAll()*-Funktion. Mit dieser Funktion können, z.b. über unser Cookie-Modal, gleichzeitig alle IFrames auf der Website freigeben werden.  (Eine Beschreibung hierfür ist zu finden unter [Einrichtung](Documentation/Einrichtung.md) -> **enableAll()-Funktion Bereitstellen**.)

