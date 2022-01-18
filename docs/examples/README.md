---
sidebar: auto
---

# Examples

## Dynamic import
in2iframeconsent can be loaded dynamically. For this we check if the container class exists and then load in2iframeconsent. 

```js
if (document.querySelectorAll('.iframeswitch-wrapper').length > 0) {
    import('in2iframeconsent');
}
```

## TYPO3 Viewhelper
🔗 Download Viewhelper Code

<<< @/docs/examples/viewhelpers/IFrameSwitchViewHelper.php
