type TemplateEventListener = {
  type: string,
  selector: string,
  callback: (event: Event) => void,
};

class ConsentSolution extends HTMLElement {
  public shadowRoot = this.attachShadow({ mode: 'closed' });

  private hostNode = this.shadowRoot.host as HTMLElement;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();

    this.injectConsentTemplate();
  }

  private injectConsentTemplate(): void {
    const consent = this.getConsentTemplate();

    this.injectTemplateContent(consent, [
      {
        type: 'click',
        selector: '[data-type="consent-button"]',
        callback: () => {
          this.injectIframeTemplate();
        },
      },
    ]);
  }

  private injectIframeTemplate(): void {
    const iframe = this.getIframeTemplate();
    this.injectTemplateContent(iframe);
  }

  private injectTemplateContent(
    template: HTMLTemplateElement,
    eventListeners?: TemplateEventListener[],
  ): void {
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    if (!eventListeners) return;

    eventListeners.forEach((listener) => {
      const element = this.shadowRoot.querySelector(listener.selector) as HTMLElement | null;
      if (element === null) {
        throw new Error(`Element not found: ${listener.selector}`);
      }

      this.shadowRoot.querySelector(listener.selector)
        ?.addEventListener(listener.type, (event) => {
          listener.callback(event);
        });
    });
  }

  private getConsentTemplate(): HTMLTemplateElement {
    const consentTemplate = this.hostNode.querySelector(
      '[data-type="consent"]',
    ) as HTMLTemplateElement | null;

    if (consentTemplate === null) {
      throw new Error('Consent template not found');
    }

    return consentTemplate;
  }

  private getIframeTemplate(): HTMLTemplateElement {
    const iframeTemplate = this.hostNode.querySelector(
      '[data-type="iframe"]',
    ) as HTMLTemplateElement | null;

    if (iframeTemplate === null) {
      throw new Error('Iframe template not found');
    }

    return iframeTemplate;
  }
}

window.customElements.define('consent-solution', ConsentSolution);

export {};
