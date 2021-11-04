import { Cookie } from './types';

export default class CookieManager {
  public static getCookie(name: string): string {
    const b = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
    return b ? b.pop() : '';
  }

  public static setCookie({ name, value, expirationYears }: Cookie): void {
    const domain = window.location.hostname;

    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + expirationYears);
    const expirationDateString = expirationDate.toUTCString();

    document.cookie = `${name}=${value};expires=${expirationDateString};domain=${domain};path=/;SameSite=None;secure`;
  }

  public static deleteCookie(name: string): void {
    this.setCookie({
      name,
      value: 'nothing',
      expirationYears: -100,
    });
  }
}
