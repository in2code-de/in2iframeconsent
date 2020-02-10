/**
 * this file is only an basic test file. The final script should be build in ES6.
 * i just wanted to test if an intervention via javascript before the iframe request is possible
 */

var getHostname = function(href) {
	var link = document.createElement('a');
	link.href = href;
	return link.hostname;
};

document.onreadystatechange = function() {
	if (document.readyState === 'interactive') {
		// it is also possible to use: DOMContentLoaded. I decided to use readyState because we use
		// already the complete readyState for the click events

		var iframes = document.querySelectorAll('iframe');
		window.in2iframeconsent = {
			categories: {
				video: {
					domains: []
				},
				misc: {
					domains: []
				}
			},
			// frames on this page
			frames: {
				allowed: [
					'www.uni-ulm.de'
				]
			}
		};

		for (var i = 0; i < iframes.length; i++) {
			var hostname = getHostname(iframes[i].src);

			// if iframes[i] not in frames.allowed
			if (window.in2iframeconsent.frames.allowed.indexOf(hostname) === -1) {
				var parentElement = iframes[i].parentNode;
				iframes[i].setAttribute('data-in2iframeconsent-id', i); // only wip

				window.in2iframeconsent.frames[i] = iframes[i];

				var newElement = document.createElement('div');
				newElement.classList.add('in2iframe-container');
				newElement.setAttribute('data-in2iframeconsent-id', i);

				parentElement.appendChild(newElement);
				parentElement.removeChild(iframes[i]);
			}

		}

	}
	if (document.readyState === 'complete') {
		var in2iframeconsentContainer = document.querySelectorAll('.in2iframe-container');

		for (var i = 0; i < in2iframeconsentContainer.length; i++) {
			in2iframeconsentContainer[i].addEventListener('click', function() {
				var iframeId = this.getAttribute('data-in2iframeconsent-id'); // only wip
				var frameElement = window.in2iframeconsent.frames[iframeId];
				var parentElement = this.parentNode;
				var hostname = getHostname(frameElement.src);

				// add the current frame hostname to the allowed domains (cookie)
				window.in2iframeconsent.frames.allowed.push(hostname);

				// @todo and update / show all frames of this host

				// enables only the current clicked iframe
				parentElement.removeChild(this);
				parentElement.appendChild(window.in2iframeconsent.frames[iframeId]);

			});
		}
	}
};

// document.addEventListener('DOMContentLoaded', function() {
// });
