/**
 * @class IframeSwitch
 */
function IframeSwitch() {
	'use strict';

	/**
	 * @type {number}
	 */
	var livetime = 86400000;

	/**
	 * @type {number}
	 */
	var expirationDate = 3650;

	/**
	 * @returns {void}
	 */
	this.initialize = function () {
		iframeSwitchListener();
		autoEnableIframes();
		uriListener();
	};

	/**
	 * @returns {void}
	 */
	this.enableAll = function () {
		setCookie('iframeswitch', '*', expirationDate);
		autoEnableIframes();
	};

	/**
	 * @returns {void}
	 */
	var iframeSwitchListener = function () {
		var elements = document.querySelectorAll('[data-iframeswitch-src]');
		for (var i = 0; i < elements.length; i++) {
			var elementStart = elements[i].querySelector('[data-iframeswitch-submit]');
			elementStart.addEventListener('click', function (event) {
				var container = closest(event.target, '[data-iframeswitch-src]');
				setCookie('iframeswitch', extractHostname(container.getAttribute('data-iframeswitch-src')), expirationDate);
				autoEnableIframes();
			});
		}
	};

	/**
	 * Enable Iframe, if src of the iframe is set in cookie for iframeswitch
	 *
	 * @returns {void}
	 */
	var autoEnableIframes = function () {
		var elements = document.querySelectorAll('[data-iframeswitch-src]');
		var cookieString = getCookie('iframeswitch');
		var cookieArray = cookieString.split(',');

		for (var i = 0; i < elements.length; i++) {
			var iframeSource = extractHostname(elements[i].getAttribute('data-iframeswitch-src'));

			if (cookieArray.includes('*')) {
				changeElementToIframe(elements[i]);
			} else {
				for (var x = 0; x < cookieArray.length; x++) {
					if (iframeSource === cookieArray[x]) {
						changeElementToIframe(elements[i]);
					}
				}
			}
		}
	};

	/**
	 * Replace <span data-iframeswitch-uri="true"></span> with the iFrame URL. So it can
	 * be used inside the container
	 *
	 * @returns {void}
	 */
	var uriListener = function () {
		var elements = document.querySelectorAll('[data-iframeswitch-uri]');
		for (var i = 0; i < elements.length; i++) {
			var parentSrc = closest(elements[i], '[data-iframeswitch-src]').getAttribute('data-iframeswitch-src');
			var uri = extractHostname(parentSrc);
			elements[i].innerHTML = uri;
		}
	};

	/**
	 * @returns {void}
	 */
	var changeElementToIframe = function (container) {
		var attributes = getAllDataAttributes(container);
		var iframe = document.createElement('iframe');
		for (var i = 0; i < attributes.length; i++) {
			iframe.setAttribute(attributes[i].name, attributes[i].value);
		}
		container.parentNode.insertBefore(iframe, container);
		container.parentNode.classList.remove("iframeswitch-init");
		container.parentNode.removeChild(container);
	};

	/**
	 * @param container
	 * @returns {[]}
	 */
	var getAllDataAttributes = function (container) {
		var attributes = [];
		for (var i = 0; i < container.attributes.length; i++) {
			var attribute = container.attributes[i];
			if (attribute.name.indexOf('data-iframeswitch-') !== -1) {
				var current = {
					'name': attribute.name.replace('data-iframeswitch-', ''),
					'value': attribute.value
				};
				attributes.push(current);
			}
		}
		return attributes;
	};

	/**
	 * @returns {string}
	 */
	var extractHostname = function (url) {
		var hostname;
		if (url.indexOf("//") > -1) {
			hostname = url.split('/')[2];
		} else {
			hostname = url.split('/')[0];
		}
		hostname = hostname.split(':')[0];
		hostname = hostname.split('?')[0];
		return hostname;
	};

	/**
	 * @param name
	 * @param value
	 * @param days
	 */
	var setCookie = function (name, value, days) {
		var newValue = '';
		var currentCookies = getCookie('iframeswitch');
		var cookieArray = currentCookies.split(',');

		if (value === '*') {
			newValue = value;
			createCookie(name, newValue, days);
		} else {
			if (!cookieArray.includes(value)) {
				if (currentCookies) {
					newValue = getCookie('iframeswitch') + ',' + value;
				} else {
					newValue = value;
				}
				createCookie(name, newValue, days);
			}
		}
	};

	/**
	 * @param name
	 * @param value
	 * @param days
	 */
	var createCookie = function (name, value, days) {
		var expires;
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * livetime));
			expires = '; expires=' + date.toGMTString();
		} else {
			expires = '';
		}
		document.cookie = name + '=' + value + expires + '; path=/';
	};

	/**
	 * @param cookieName
	 * @returns {string}
	 */
	var getCookie = function (cookieName) {
		var name = cookieName + '=';
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return '';
	};

	/**
	 * JavaScript pendent to jQuerys closest() function
	 *
	 * @param el
	 * @param selector
	 * @returns {*}
	 */
	var closest = function (el, selector) {
		var matchesFn;
		// find vendor prefix
		[
			'matches',
			'webkitMatchesSelector',
			'mozMatchesSelector',
			'msMatchesSelector',
			'oMatchesSelector'
		].some(function (fn) {
			if (typeof document.body[fn] == 'function') {
				matchesFn = fn;
				return true;
			}
			return false;
		});
		var parent;

		// traverse parents
		while (el) {
			parent = el.parentElement;
			if (parent && parent[matchesFn](selector)) {
				return parent;
			}
			el = parent;
		}
		return null;
	};
}

window.iframeSwitch=new IframeSwitch;

window.iframeSwitch.initialize();