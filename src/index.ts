import { version } from '../package.json';
import { IframeDataAttribute } from './types';
import CookieManager from './CookieManager';

class In2iframeswitch {
  private _cookieName: string = 'iframeswitch';
  private _expirationYears: number = 10;

  constructor() {
    this._addButtonEvents();
    this._autoEnableIframes();
    In2iframeswitch._addDomainInformation();

    window.iframeSwitch = this || {};
  }

  /**
     * Replaces iFrameconsentbox with correct iFrame
     * @param container
     * @private
     */
  private static _changeElementToIframe(container: HTMLElement): void {
    const attributes = In2iframeswitch._getAllDataAttributes(container);
    const iframe = document.createElement('iframe');

    attributes.forEach((attribute) => {
      iframe.setAttribute(
        attribute.name,
        attribute.value,
      );
    });

    const parentNode = container.parentNode as HTMLElement;
    parentNode.insertBefore(iframe, container);
    parentNode.classList.remove('iframeswitch-init');
    parentNode.removeChild(container);
  }

  /**
     * Enable Iframe, if src of the iframe is set in cookie for iframeswitch
     * @private
     */
  private _autoEnableIframes(): void {
    const elements = document.querySelectorAll<HTMLElement>('[data-iframeswitch-src]');
    const cookieString = CookieManager._getCookie(this._cookieName);
    const activeCookies: string[] = cookieString.split(',');

    elements.forEach((element) => {
      if (activeCookies.includes('*')) {
        In2iframeswitch._changeElementToIframe(element);
        return;
      }

      const iframeURL:string | null = element.getAttribute('data-iframeswitch-src');

      if (iframeURL) {
        const iframeSource = In2iframeswitch._extractHostname(iframeURL);

        activeCookies.forEach((currentCookie) => {
          if (currentCookie === iframeSource) {
            In2iframeswitch._changeElementToIframe(element);
          }
        });
      }
    });
  }

  /**
     * Replace <span data-iframeswitch-uri="true"></span> with the iFrame URL.
     * So it can be used inside the container
     */
  private static _addDomainInformation(): void {
    const elements = document.querySelectorAll<HTMLElement>('[data-iframeswitch-uri]');
    elements.forEach((element) => {
      const parent = In2iframeswitch._closest(
          element,
          '[data-iframeswitch-src]',
      );

      if (parent) {
        const parentSrc = parent.getAttribute('data-iframeswitch-src') || 'error, domain not found';
        element.innerHTML = In2iframeswitch._extractHostname(parentSrc);
      }
    });
  }

  private _addButtonEvents(): void {
    const elements = document.querySelectorAll<HTMLElement>('[data-iframeswitch-src]');

    elements.forEach((element) => {
      const elementStart = element.querySelector('[data-iframeswitch-submit]');

      if (elementStart) {
        elementStart.addEventListener(
            'click',
            (event) => {
              const currentCookies = CookieManager._getCookie(this._cookieName);
              if (currentCookies === '*') return;

              const container = In2iframeswitch._closest(
                  event.target as HTMLElement,
                  '[data-iframeswitch-src]',
              );
              if (!container) return;

              const iframeSwitchURL = container.getAttribute('data-iframeswitch-src');
              if (!iframeSwitchURL) return;

              const newCookie = In2iframeswitch._extractHostname(iframeSwitchURL);

              CookieManager._setCookie({
                name: this._cookieName,
                value: currentCookies.length > 0 ? `${currentCookies},${newCookie}` : newCookie,
                expirationYears: this._expirationYears,
              })

              this._autoEnableIframes();
            },
        );
      }
    });
  }

  /**
     * JavaScript pendent to jQuerys closest() function
     */
  private static _closest(element: HTMLElement, selector: string): HTMLElement | null {
    let matchesFn;

    // find vendor prefix
    [
      'matches',
      'webkitMatchesSelector',
      'mozMatchesSelector',
      'msMatchesSelector',
      'oMatchesSelector',
    ].some((fn) => {
      // @ts-ignore
      if (typeof document.body[fn] === 'function') {
        matchesFn = fn;
        return true;
      }
      return false;
    });

    let parent: HTMLElement;

    // traverse parents
    while (element) {
      // @ts-ignore
      parent = element.parentElement;
      // @ts-ignore
      if (parent && parent[matchesFn](selector)) {
        return parent;
      }
      element = parent;
    }

    return null;
  }

  private static _getAllDataAttributes(container: HTMLElement): IframeDataAttribute[] {
    const attributes: {name: string, value: string}[] = [];

    Array.from(container.attributes).forEach((attribute) => {
      if (attribute.name.indexOf('data-iframeswitch-') !== -1) {
        attributes.push({
          name: attribute.name.replace('data-iframeswitch-', ''),
          value: attribute.value,
        });
      }
    });

    return attributes;
  }

  private static _extractHostname(url: string): string {
    let hostname: string;

    if (url.indexOf('//') > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }

    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];

    return hostname || '';
  }

  /**
     * Enables all iFrameConsents
     */
  public enableAll(): void {
    CookieManager._setCookie({
      name: this._cookieName,
      value: '*',
      expirationYears: this._expirationYears,
    });

    this._autoEnableIframes();
  }

  /**
     * Disables all accepted iFrameConsents and deletes all in2iframeconsent Cookies
     */
  public disableAll(): void {
    CookieManager._deleteCookie(this._cookieName);
  }

  public getVersion(): void {
    console.log(`in2iframeconsent is running on version ${version} 🌈`);
  }
}

// eslint-disable-next-line no-new
new In2iframeswitch();
