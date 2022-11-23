import { Cookie } from './types';

export default class CookieManager {
  public static _getCookie(name: string): string {
    const b = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);

    if (b) return b.pop() || '';
    return '';
  }

  public static _setCookie({ name, value, expirationMonths }: Cookie): void {
    const domain = window.location.hostname;

    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + expirationMonths);
    const expirationDateString = expirationDate.toUTCString();

    document.cookie = `${name}=${value};expires=${expirationDateString};domain=${domain};path=/;SameSite=Strict;secure`;
  }

  public static _deleteCookie(name: string): void {
    this._setCookie({
      name,
      value: '',
      expirationMonths: -1,
    });
  }
}
