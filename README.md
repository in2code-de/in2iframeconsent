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

---

### Configuration:
You have the option to adjust the cookie name and storage duration of the in2iframeswitch. 
For this purpose, the following configuration object must be created before the in2iframeswitch code is loaded.

```js
window.iframeSwitchConfig = Object.freeze({
    'cookieName': 'myCustomCookieName',
    'expirationMonths': 12,
});
```

in2iframeconsent also works without prior configuration.
The following default values are configured:

```json
{
    "cookieName": "iframeswitch",
    "expirationMonths": 3
}
```

---

### Styling
in2iframeconsent provides predefined styling for the consent boxes.
We recommend using this styling as a base for your own implementation.

You can find the CSS [here](dist/css/in2iframeconsent.css).

---

### TYPO3 Viewhelper
Define the [in2iframeconsent viewhelper](docs/examples/viewhelpers/IFrameSwitchViewHelper.php) in your TYPO3 extension folder and change the namespace.

---

### TYPO3 Template
Wrap the viewhelper around your iFrame(s). In our [example](docs/examples/templates/base.html) its a YouTube iFrame. 

---

### Consent Box
In the template file you specify the partial of the consent box.
Now you have to create the partial for correct rendering. 
An example integration can be found [here](docs/examples/partials/consentbox.html).

---

### Translations
As a last step, you should translate the consent box. 
We provided an exemplary translations in this [folder](docs/examples/language).

*Please review the texts before using them in any project, 
because they´re only an example.*

### Contribute:
If you want to help with the project, this [readme](docs/development.md) will help you.
