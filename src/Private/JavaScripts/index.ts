import { IframeDataAttribute } from './types';
import pkg from 'package.json';
import { CookieManager } from './CookieManager';

class in2iframeswitch {
    private cookieName: string = 'iframeswitch';
    private expirationYears: number = 10;
    private version: string = pkg.version;

    constructor() {
        this.addButtonEvents();
        this.autoEnableIframes();
        this.addDomainInformation();

        window['iframeSwitch'] = this;
    }

    /**
     * Replaces iFrameconsentbox with correct iFrame
     * @param container
     * @private
     */
    private changeElementToIframe(container: HTMLElement): void {
        const attributes = this.getAllDataAttributes(container);
        const iframe = document.createElement('iframe');

        attributes.forEach((attribute) => {
            iframe.setAttribute(
                attribute.name,
                attribute.value
            );
        });

        container.parentNode.insertBefore(iframe, container);
        container.parentNode.classList.remove("iframeswitch-init");
        container.parentNode.removeChild(container);
    }

    /**
     * Enable Iframe, if src of the iframe is set in cookie for iframeswitch
     * @private
     */
    private autoEnableIframes(): void {
        const elements = document.querySelectorAll<HTMLElement>('[data-iframeswitch-src]');
        const cookieString = CookieManager.getCookie(this.cookieName);
        const activeCookies: string[] = cookieString.split(',');

        elements.forEach((element) => {
            if (activeCookies.includes('*')) {
                this.changeElementToIframe(element);
                return;
            }

            const iframeSource = in2iframeswitch.extractHostname(element.getAttribute('data-iframeswitch-src'));

            activeCookies.forEach((currentCookie) => {
                if (currentCookie === iframeSource) {
                    this.changeElementToIframe(element);
                }
            });
        })
    }

    /**
     * Replace <span data-iframeswitch-uri="true"></span> with the iFrame URL.
     * So it can be used inside the container
     */
    private addDomainInformation(): void {
        const elements = document.querySelectorAll<HTMLElement>('[data-iframeswitch-uri]');
        elements.forEach((element) => {
            const parentSrc = in2iframeswitch.closest(
                elements,
                '[data-iframeswitch-src]').getAttribute('data-iframeswitch-src'
            );

            const uri = in2iframeswitch.extractHostname(parentSrc);
            element.innerHTML = uri;
        });
    }

    private addButtonEvents(): void {
        const elements = document.querySelectorAll<HTMLElement>('[data-iframeswitch-src]');

        elements.forEach((element) => {
            const elementStart = element.querySelector('[data-iframeswitch-submit]');

            elementStart.addEventListener(
                'click',
                (event) => {
                    const container = in2iframeswitch.closest(
                        event.target,
                        '[data-iframeswitch-src]'
                    );

                    CookieManager.setCookie({
                        name: this.cookieName,
                        value: in2iframeswitch.extractHostname(container.getAttribute('data-iframeswitch-src')),
                        expirationYears: this.expirationYears
                    });

                    this.autoEnableIframes();
                }
            );
        });
    }

    /**
     * JavaScript pendent to jQuerys closest() function
     */
    private static closest(element: HTMLElement[], selector: string): HTMLElement | null {
        let matchesFn;

        // find vendor prefix
        [
            'matches',
            'webkitMatchesSelector',
            'mozMatchesSelector',
            'msMatchesSelector',
            'oMatchesSelector'
        ].some(function (fn) {
            if (typeof document.body[fn] == 'function') {
                matchesFn = fn;
                return true;
            }
            return false;
        });

        let parent: HTMLElement;

        // traverse parents
        while (element) {
            parent = element.parentElement;
            if (parent && parent[matchesFn](selector)) {
                return parent;
            }
            element = parent;
        }

        return null;
    }

    private getAllDataAttributes(container: HTMLElement): IframeDataAttribute[] {
        let attributes = [];

        Array.from(container.attributes).forEach((attribute) => {
            if (attribute.name.indexOf('data-iframeswitch-') !== -1) {
                attributes.push({
                    'name': attribute.name.replace('data-iframeswitch-', ''),
                    'value': attribute.value
                });
            }
        })

        return attributes;
    }

    private static extractHostname(url: string): string {
        let hostname: string;

        if (url.indexOf("//") > -1) {
            hostname = url.split('/')[2];
        } else {
            hostname = url.split('/')[0];
        }

        hostname = hostname.split(':')[0];
        hostname = hostname.split('?')[0];

        return hostname;
    }

    /**
     * Enables all iFrameConsents
     */
    public enableAll(): void {
        CookieManager.setCookie({
            name: this.cookieName,
            value: '*',
            expirationYears: this.expirationYears,
        });

        this.autoEnableIframes();
    }

    /**
     * Disables all accepted iFrameConsents and deletes all in2iframeconsent Cookies
     */
    public disableAll(): void {
        CookieManager.deleteCookie(this.cookieName);
    }

    public getVersion(): void {
        console.log(`Your running on version ${this.version} of in2iframeconsent`);
    }
}
