import { IframeDataAttribute } from './types';
import { CookieCollection } from './CookieCollection';

class in2iframeswitch {
    private cookieName: string = 'iframeswitch';
    private expirationYears: number = 10;

    constructor() {
        this.iframeSwitchListener();
        this.autoEnableIframes();
        this.uriListener();

        window['iframeSwitch'] = this;
    }

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
     * Enable iFrame f src of the iFrame is set in the cookie for iframeswitch
     */
    private autoEnableIframes(): void {
        const elements = document.querySelectorAll<HTMLElement>('[data-iframeswitch-src]');
        const cookieString = CookieCollection.getCookie(this.cookieName);
        const cookies: string[] = cookieString.split(',');

        elements.forEach((element) => {
            const iframeSource = this.extractHostname(element.getAttribute('data-iframeswitch-src'));

            if (cookies.includes('*')) {
                this.changeElementToIframe(element);
            } else {
                cookies.forEach((cookie) => {
                    if (iframeSource === cookie) {
                        this.changeElementToIframe(element);
                    }
                });
            }
        })
    }

    /**
     * Replace <span data-iframeswitch-uri="true"></span> with the iFrame URL.
     * So it can be used inside the container
     */
    private uriListener(): void {
        const elements = document.querySelectorAll<HTMLElement>('[data-iframeswitch-uri]');
        elements.forEach((element) => {
            const parentSrc = this.closest(
                elements,
                '[data-iframeswitch-src]').getAttribute('data-iframeswitch-src'
            );

            const uri = this.extractHostname(parentSrc);
            element.innerHTML = uri;
        });
    }

    private iframeSwitchListener(): void {
        const elements = document.querySelectorAll<HTMLElement>('[data-iframeswitch-src]');

        elements.forEach((element) => {
            const elementStart = element.querySelector('[data-iframeswitch-submit]');

            elementStart.addEventListener('click', (event) => {
                const container = this.closest(event.target, '[data-iframeswitch-src]');

                CookieCollection.setCookie({
                    name: this.cookieName,
                    value: this.extractHostname(container.getAttribute('data-iframeswitch-src')),
                    expirationYears: this.expirationYears
                });

                this.autoEnableIframes();
            });
        });
    }

    /**
     * JavaScript pendent to jQuerys closest() function
     */
    private closest(element: HTMLElement[], selector: string): HTMLElement | null {
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
        CookieCollection.setCookie({
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
        CookieCollection.deleteCookie(this.cookieName);
    }
}
