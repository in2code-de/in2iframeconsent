import { Cookie } from './types';
export default class CookieManager {
    static getCookie(name: string): string;
    static setCookie({ name, value, expirationYears }: Cookie): void;
    static deleteCookie(name: string): void;
}
