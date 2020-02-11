class IframeManager {
	constructor() {

	}

	/**
	 * @param iframe
	 */
	replaceIFrame(iframe, id) {
		var parentElement = iframe.parentNode;
		iframe.setAttribute("data-in2iframeconsent-id", id); // only wip
		iframe.setAttribute("data-in2iframeconsent-category", id); // only wip

		window.in2iframeconsent.frames[id] = iframe;

		var newElement = document.createElement("div");
		newElement.classList.add("in2iframe-container");
		newElement.setAttribute("data-in2iframeconsent-id", id);

		parentElement.appendChild(newElement);
		parentElement.removeChild(iframe);
	}
}

export let iframeManager = new IframeManager();
