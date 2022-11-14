---
sidebar: auto
---

# Introduction

## What is in2iframeconsent

in2iframeconsent is a TYPO3 consent management solution developed by in2code to load iFrames only after a page visitor's consent.

It enables the display of an iFrame consent banner. After the page visitor agrees, the consent banner is then replaced with the correct iFrame.

## Getting started

### Installation

```shell
# latest stable
$ npm i in2iframeconsent
```

After installation, in2iframeconsent can be installed via an import. It is recommended to [load the script dynamically](../examples/README.md#dynamic-import).
```js
import('in2iframeconsent');
```

---


### Creating TYPO3 specific files

Since in2iframeconsent is a TYPO3 extension, some additional code has to be added.

**The additional files can be easily found [here](https://github.com/in2code-de/in2iframeconsent/tree/develop/docs/.downloads/extension).**

#### 1. TYPO3 viewhelper
Move the **in2iframeconsent viewhelper** from ```Classes/ViewHelpers/IFrameSwitchViewHelper.php``` into your TYPO3 extension folder and change the namespace.

---

#### 2. TYPO3 Template
Wrap the viewhelper in your template file around your iFrame(s). 

We provided you with an example in ```Resources/Private/Templates/base.html```

---

#### 3. Consent Box
In the template file you specify the partial of the consent box.
Now you have to create the partial for correct rendering.

An example can be found in ```Resources/Private/Partials/Consentbox.html```

---

#### 4. Translations
As a last step, you should translate the consent box.

The translation files for english and german can be found under ```Resources/Private/Language/```

*Please review the texts before using them in any project,
because they´re only an example.*

---

## Configuration

### Default configuration
in2iframeconsent works without prior configuration.

**The following default values are configured:**

```json
{
    "cookieName": "iframeswitch",
    "expirationMonths": 3
}
```

### Configuration options

You have the option to adjust the cookie name and storage duration of the in2iframeswitch.
For this purpose, the following configuration object must be created before the in2iframeswitch code is loaded.

```js
window.iframeSwitchConfig = Object.freeze({
    'cookieName': 'myCustomCookieName',
    'expirationMonths': 12,
});

import('in2iframeconsent');
```
