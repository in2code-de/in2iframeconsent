import { Cookie } from './types';
export default class CookieManager {
    static _getCookie(name: string): string;
    static _setCookie({ name, value, expirationMonths }: Cookie): void;
    static _deleteCookie(name: string): void;
}
