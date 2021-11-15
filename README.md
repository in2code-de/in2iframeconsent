# in2iframeconsent

in2iframeconsent is a TYPO3 consent management solution developed by [in2code](https://www.in2code.de/en/) to load iFrames only after a page visitor's consent.

in2iframeconsent enables the display of an iFrame consent banner.
After the page visitor agrees, the consent banner is then replaced with the correct iFrame.

---

## Getting Started

### Installation

```shell
$ npm i in2iframeconsent
```

### JavaScript

```js
import('in2iframeconsent');
```

```window.iframeSwitch.enableAll()``` - accept all iFrame consent boxes

```window.iframeSwitch.disableAll()``` - reset all iFrame consent boxes (after reload)

```window.iframeSwitch.getVersion()``` - get current in2iframeconsent version

### Styling
in2iframeconsent provides predefined styling for the consent boxes.
We recommend using this styling as a base for your own implementation.

You can find the CSS [here](dist/css/in2iframeconsent.css).

### TYPO3 Viewhelper
Define the [in2iframeconsent viewhelper](examples/viewhelpers/IFrameSwitchViewHelper.php) in your TYPO3 extension folder and change the namespace.

### TYPO3 Template
Wrap the viewhelper around your iFrame(s). In our [example](examples/templates/base.html) its a YouTube iFrame. 

### Consent Box
In the template file you specify the partial of the consent box.
Now you have to create the partial for correct rendering. 
An example integration can be found [here](examples/partials/consentbox.html).

### Translations
As a last step, you should translate the consent box. 
We provided a exemplary translations in this [folder](examples/language).

*Please review the texts before using them in any project, 
because they´re only an example.*
