declare global {
  interface Window { iframeswitch: any; }
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
