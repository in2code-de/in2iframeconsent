declare global {
  interface Window { iframeSwitch: any; }
}

export interface Cookie {
  name: string;
  value: string;
  expirationYears: number;
}

export interface IframeDataAttribute {
  name: string,
  value: string,
}
