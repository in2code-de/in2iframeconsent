
<p align="center"><a href="#">
    <img width=45% alt="" src="https://raw.githubusercontent.com/in2code-de/in2iframeconsent/feature/typescript-rewrite/src/assets/images/in2code-logo.png">
</a></p>

## What is in2iframeswitch?

in2iframeswitch is a consent management solution developed by in2code to load iFrames only after a page visitor's consent.

in2iframeconsent enables the display of an iFrame Consent Banner.
After the page visitor agrees, the Consent banner is then replaced with the correct iFrame.

## Installation

### NPM

```shell
# latest stable
$ npm i in2iframeconsent
```

After that you can use the following JavaScript in the project:

```js
import('in2iframeconsent');
```

### Classic

For projects that do not yet have a build toolchain for modern JavaScript, the classic way is to use a JavaScript file
which is statically included in a project.

For this you can simply download a release build of in2iframeconsent from the
[Releases](https://gitlab.in2code.de/in2code-Team/in2cookiemodal/-/releases) page from the GitLab repository.

This file can then simply be included in the page with a `script` tag.

## Getting Started

### Styling
in2iframeconsent provides predefined styling for the consent boxes.
We recommend to use in2iframeconsent in combination with a CSS compiler like SCSS.

An exemplary integration of the required CSS files via SCSS can be found [here]().

### Additional functions

The in2iframeconsent configuration is stored under ```window.iframeSwitch``` after successful initialization.
Additional functions can be accessed from here.

#### Enable all iFrames
```javascript
window.iframeSwitch.enableAll();
```

#### Disable all iFrames
```javascript
window.iframeSwitch.disableAll();
```
