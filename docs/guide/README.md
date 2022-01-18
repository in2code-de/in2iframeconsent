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

### Creating TYPO3 specific files

Since in2iframeconsent is a TYPO3 extension, some additional code has to be added.

```php
<?php
declare(strict_types=1);

namespace In2code\In2iframeconsent\ViewHelpers;

use TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper;

/**
 * Class OverrideSubheaderPropertyHelper
 */
class IFrameSwitchViewHelper extends AbstractViewHelper
{
    /**
     * @var bool
     */
    protected $escapeOutput = false;

    /**
     * @return void
     */
    public function initializeArguments()
    {
        $this->registerArgument('content', 'string', 'consent markup', true);
    }

    /**
     * @return mixed|string
     */
    public function render()
    {
        if ($this->isIframeExisting()) {
            return $this->replace();
        } else {
            return $this->renderChildren();
        }
    }

    /**
     * @return string
     */
    protected function replace(): string
    {
        $dom = new \DOMDocument();
        @$dom->loadHTML(
            $this->wrapHtmlWithMainTags($this->renderChildren())
            , LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD
        );

        $content = new \DOMDocument();
        @$content->loadHTML(
            $this->wrapHtmlWithMainTags($this->arguments['content'])
            , LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD
        );

        /** @var \DOMElement $iframe */
        if ($dom->getElementsByTagName('iframe')->length > 0) {
            foreach ($dom->getElementsByTagName('iframe') as $iframe) {
                $attributes = [];
                /** @var \DOMAttr $attribute */
                foreach ($iframe->attributes as $attribute) {
                    $attributes[$attribute->nodeName] = $attribute->nodeValue;
                }

                $div = $dom->createElement('div');
                $div->setAttribute('class', 'iframeswitch-container');
                foreach ($attributes as $attributeKey => $attribute) {
                    $div->setAttribute('data-iframeswitch-' . $attributeKey, $attribute);
                }

                $div->appendChild($dom->importNode($content->documentElement, true));

                $iframe->parentNode->replaceChild($div, $iframe);
            }
        }

        return $this->stripMainTagsFromHtml($dom->saveHTML());
    }

    /**
     * @return bool
     */
    protected function isIframeExisting(): bool
    {
        return stristr($this->renderChildren(), '<iframe') !== false;
    }

    /**
     * Wrap html with "<?xml encoding="utf-8" ?><html><body>|</body></html>"
     *
     *  This is a workarround for HTML parsing and wrting with \DOMDocument()
     *      - The html and body tag are preventing strange p-tags while using LIBXML_HTML_NOIMPLIED
     *      - The doctype declaration allows us the usage of umlauts and special characters
     *
     * @param string $html
     * @return string
     */
    protected function wrapHtmlWithMainTags(string $html): string
    {
        return '<?xml encoding="utf-8" ?><html><body>' . $html . '</body></html>';
    }

    /**
     * Remove tags <?xml encoding="utf-8" ?><html><body></body></html>
     * This function is normally used after wrapHtmlWithMainTags
     *
     * @param string $html
     * @return string
     */
    protected function stripMainTagsFromHtml(string $html): string
    {
        return str_replace(['<html>', '</html>', '<body>', '</body>', '<?xml encoding="utf-8" ?>'], '', $html);
    }
}

```



#### TYPO3 viewhelper
Define the [in2iframeconsent viewhelper](docs_old/examples/viewhelpers/IFrameSwitchViewHelper.php) in your TYPO3 extension folder and change the namespace.

---

#### TYPO3 Template
Wrap the viewhelper around your iFrame(s). In our [example](docs_old/examples/templates/base.html) its a YouTube iFrame.

---

#### Consent Box
In the template file you specify the partial of the consent box.
Now you have to create the partial for correct rendering.
An example integration can be found [here](docs_old/examples/partials/consentbox.html).

---

#### Translations
As a last step, you should translate the consent box.
We provided an exemplary translations in this [folder](docs_old/examples/language).

*Please review the texts before using them in any project,
because they´re only an example.*

---

## Configuration

### Default configuration
in2iframeconsent works without prior configuration.
The following default values are configured:

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

---

### Styling
in2iframeconsent provides predefined styling for the consent boxes.
We recommend using this styling as a base for your own implementation.

You can find the CSS [here](dist/css/in2iframeconsent.css).
