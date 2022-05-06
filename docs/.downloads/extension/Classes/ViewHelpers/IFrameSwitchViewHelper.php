<?php
declare(strict_types=1);

namespace In2code\In2iframeconsent\ViewHelpers;

use TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper;

/**
 * Class IFrameSwitchViewHelper
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
        }

        return $this->renderChildren();
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
