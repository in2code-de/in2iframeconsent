import EventBus from './EventBus';

export default class IframeConsent extends HTMLElement {
  private url: string = '';

  private shadow = this.attachShadow({ mode: 'closed' });

  constructor() {
    super();

    customElements.define('iframe-consent', IframeConsent);
    this.showConsent();
    this.subscribeToEvents();
  }

  private showConsent() {
    const consent = document.getElementById('consent');
    if (consent === null) {
      throw new Error('Consent element not found');
    }

    const consentContent = consent.cloneNode(true);
    this.shadow.innerHTML = '';
    this.shadow.appendChild(consentContent);
    const button = this.shadow.querySelector('button') as HTMLButtonElement | null;
    if (button === null) throw new Error('Button not found');
    this.handleButtonClick(button);
  }

  private showIframe = () => {
    const iframe = document.getElementById('iframe');
    if (iframe === null) {
      throw new Error('Iframe element not found');
    }

    const iframeContent = iframe.cloneNode(true);
    this.shadow.innerHTML = '';
    this.shadow.appendChild(iframeContent);
  };

  private subscribeToEvents() {
    const eventBus = EventBus.getInstance();
    eventBus.register('consent:accept', ({ url }: { url: string }) => {
      if (this.url !== url) return;
      this.showIframe();
    });
  }

  private handleButtonClick(button: HTMLButtonElement) {
    button.addEventListener('click', () => {
      const eventBus = EventBus.getInstance();
      eventBus.dispatch('consent:accept', { url: this.url });
    });
  }
}
