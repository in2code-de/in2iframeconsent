class UrlUtility {

	/**
	 * @param href
	 * @returns {string}
	 */
	static getHostname(href) {
		let linkElement = document.createElement("a");
		linkElement.href = href;
		return linkElement.hostname;
	}
}

export {UrlUtility}
