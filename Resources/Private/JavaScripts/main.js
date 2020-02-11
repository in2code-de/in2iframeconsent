import {iframeManager} from "./Modules/IframeManager";
import {UrlUtility} from "./Utility/UrlUtility";

/**
 * this file is only an basic test file. The final script should be build in ES6.
 * i just wanted to test if an intervention via javascript before the iframe request is possible
 */

document.onreadystatechange = function() {
	if (document.readyState === "interactive") {
		// it is also possible to use: DOMContentLoaded. I decided to use readyState because we use
		// already the complete readyState for the click events

		var iframes = document.querySelectorAll("iframe");
		window.in2iframeconsent = {
			categories: {
				video: {
					domains: []
				},
				misc: {
					domains: [
				//		"local.typo3.8.de"
					]
				}
			},
			// frames on this page
			frames: {
				allowed: [
					"www.uni-ulm.de"
				]
			}
		};

		for (var i = 0; i < iframes.length; i++) {
			var hostname = UrlUtility.getHostname(iframes[i].src);

			// if iframes[i] not in frames.allowed
			if (window.in2iframeconsent.frames.allowed.indexOf(hostname) === -1) {
				iframeManager.replaceIFrame(iframes[i], i);
			}

		}

	}
	if (document.readyState === "complete") {
		var in2iframeconsentContainer = document.querySelectorAll(".in2iframe-container");

		for (var i = 0; i < in2iframeconsentContainer.length; i++) {
			in2iframeconsentContainer[i].addEventListener("click", function() {
				var iframeId = this.getAttribute("data-in2iframeconsent-id"); // only wip
				var frameElement = window.in2iframeconsent.frames[iframeId];
				var parentElement = this.parentNode;
				var hostname = UrlUtility.getHostname(frameElement.src);

				// add the current frame hostname to the allowed domains (cookie)
				window.in2iframeconsent.frames.allowed.push(hostname);
				//document.cookie = "allowed=" + hostname;
				// @todo and update / show all frames of this host

				// enables only the current clicked iframe
				parentElement.removeChild(this);
				parentElement.appendChild(window.in2iframeconsent.frames[iframeId]);

			});
		}
	}
};

// document.addEventListener("DOMContentLoaded", function() {
// });
