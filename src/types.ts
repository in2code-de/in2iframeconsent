declare global {
  interface Window {
    iframeSwitch: any,
    iframeSwitchConfig: {
      cookieName: string,
      expirationMonths: number,
    },
  }
}

export interface Cookie {
  name: string;
  value: string;
  expirationMonths: number;
}

export interface IframeDataAttribute {
  name: string,
  value: string,
}
