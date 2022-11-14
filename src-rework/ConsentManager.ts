import IframeConsent from './IframeConsent';

declare global {
  interface Window {
    ConsentManager: any,
  }
}

class ConsentManager {
  private static instance: ConsentManager;

  constructor() {
    ConsentManager.initialize();
  }

  private static initialize() {
    window.customElements.define('iframe-consent', IframeConsent);
  }

  public static getInstance(): ConsentManager {
    if (!ConsentManager.instance) {
      ConsentManager.instance = new ConsentManager();
    }

    return ConsentManager.instance;
  }
}

window.ConsentManager = new ConsentManager();
