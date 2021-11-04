# TYPO3 VIEWHELPER

### Allgemein

Um eine globale Lösung für die Verwendung unserer 2-Klick-Lösung bereit stellen zu können, haben wir uns dafür entschieden, die 2-Klick-Lösung mit Hilfe eines Viewhelpers in unseren Typo3-Projekten zu realisieren. 


### Einrichtung

1. Wie unter [Einrichtung](Einrichtung.md) beschrieben, müssen auch für die Verwendung in TYPO3 die Dateien **in2iframeconsent.js** und **in2iframeconsent.css** mit in das jeweilige Projekt aufgenommen werden. 

2. Den hier im Repo hinterlegten Viewhelper in das jeweilige Projekt Aufnehmen. (Pfad des Namespace sowie use statemants evtl. anpassen)
 
    Link zum Viewhelper: [Viewhelper](../Einrichtung_TYPO3/Viewhelper/IFrameSwitchViewHelper.php)

3. Partial im Projekt anlegen, in welchem das Markup des Zustimmungskontextes definiert ist. Dem Partial können, wie unter [Einrichtung](Einrichtung.md) beschrieben, auch Data-Attribute mitgeben werden um das aussehen, des Zustimmungskontextes zu verändern. 

   **[WICHTIG]** Der Zustimmungs-Button, mit welchem das einbinden eines IFrames erlaubt wird, braucht folgendes Attribut: '**data-iframeswitch-submit="true"**'. 

    Link Beispiel Partial:
 [Beispiel Partial](../Einrichtung_TYPO3/Partials/IframeWithVideo.html)

4. Um den Viewehlper nun zu benutzten, muss man diesen einfach, in dem Template des zu rendernden Iframes, außerhalb seines Elements aufrufen. Zudem muss dem Viewhelper auch den Pfad des Zustimmungs-Partials über das argument "content" mitgeben. 
 
   Link Beispiel aufruf Viewehlerp im Template: [Beispiel Viewhelper aufruf](../Einrichtung_TYPO3/example_call_viewhelper.html)

### Funktion

Die Funktion des Viewhelpers ist relativ schnell beschrieben, da dieser sich das aktuell geladene HTML holt, hierbei dann nach einem IFrame sucht und dieses durch das hinterlegte Zustimmungs-Partials ersetzt, solange bis in dem Partial keine Zustimmung getroffen wurde. Sobald eine Zustimmung zum Laden von IFrames gesetzt wurde, wird auch das jeweilige IFrame gerendert.