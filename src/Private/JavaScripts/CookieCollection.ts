import { Cookie } from "./types";

export class CookieCollection {

    static getCookie(cookieName: string): string {
        const name = cookieName + '=';
        const ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }

        return '';
    }

    static setCookie({ name, value, expirationYears }: Cookie): void {
        const domain = window.location.hostname;

        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + expirationYears);
        const expirationDateString = expirationDate.toUTCString();

        document.cookie = `${name}=${value};expires=${expirationDateString};domain=${domain};path=/;SameSite=None;secure`;
    }

    static deleteCookie(name: string): void {
        this.setCookie({
            name,
            value: 'nothing',
            expirationYears: -100,
        });
    }
}
