# Einrichtung

###Allgemein
Zum Einrichten des in2iframeconsent muss die **main.js** und **main.css** in das jeweilige Projekt mit aufgenommen werden.

Sobald das Javascript und Styling im Projekt liegt, muss das Template für das jeweilige Content-Element, in dem das Iframe geladen wird, angepasst werden.

Beispiel Template:
````
<div class="iframeswitch-container"
  	 data-iframeswitch-src="https://player.vimeo.com/video/226053498"
  	 data-iframeswitch-class="iframe">
  	Um diesen Inhalt (Quelle: <span data-iframeswitch-uri="true">www.xyz.de</span>) anzuzeigen, klicken Sie bitte
  	auf Akzeptieren. Wir möchten Sie darauf hinweisen, dass durch das Akzeptieren dieses Iframes Daten an Dritte übermittelt oder
  	Cookies gespeichert werden könnten. Weitere Informationen finden Sie auf unserer <a href="#">Datenschutzerklärung</a>.
  	<button class="iframeswitch-submit">Akzeptieren</button>
  </div>
````
**class="iframeswitch-container"** => Styling des Consents im FE

**data-iframeswitch-src** => Source des einzubindenen IFrames. 

**data-iframeswitch-class** => Über die Klasse Iframe kann das styling des eingebundenen Iframes angepasst werden

**data-iframeswitch-uri** => ersetzt im FE, in der Datenschutzbeschreibung des IFrames, *www.xyz.de* mit der Domaine des jeweiligen Iframes

```<a href="#">Datenschutzerklärung</a>``` => hier kann ein Verweis auf die Datenschutzerklärung hinterlegt werden

**iframeswitch-submit** => Über den Button wird das Laden des Iframes akzeptiert und das IFrame dementsprechend gerendert


###enableAll()-Funktion Bereitstellen

Um die Funktion zum gleichzeitigen akzeptieren aller IFrames zum ermöglichen, muss folgendes Script, z.b. in unserem Cookie-Modal, hinterlegt werden. 

```
var iframeSwitch = new window.IframeSwitch();
iframeSwitch.enableAll();
```
Durch diesen Aufruf wird in dem Cookie "iframeswitch" als Wert ein "*" gespeichert, welches dem in2iframeconsent sagt, dass alle IFrames akzeptiert sind.
