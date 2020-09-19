/**Schwfity preloads and caches same-origin html documents for a native-app feeling on static sites.*/
export default class Schwifty {

	/**@constructor
	 * @param {Object} options
	 * @param {function} [options.onload = null] - the callback(s) that run when a new page is rendered
	 * @param {string} [options.selector = `a[href^='${window.location.origin}']:not([data-no-schwifty]), a[href^='/']:not([data-no-schwifty])`] - the DOM selector used to find preloadable links
	 * @param {Number} [options.cacheLimit = 85] - the maximum number of pages allowed to be preloaded in the cache
	 * @param {string} [options.transitioningAttribute = 'data-schwifty'] - attribute updated on the `documentElement` during a page transition
	 * @param {boolean} [options.preserveScroll = false] - preserve scroll position on page load
	 * @param {(boolean|Object)} [options.preserveAttributes = false] - preserve attributes on top-level DOM elements (`documentElement`, `head`, and `body`)
	 */
	constructor({
		onload = null,
		selector,
		cacheLimit,
		transitioningAttribute,
		preserveScroll = false,
		preserveAttributes = false,
	} = {}) {


		// Global variables
		selector = selector || `a[href^='${window.location.origin}']:not([data-no-schwifty]), a[href^='/']:not([data-no-schwifty])`;
		cacheLimit = cacheLimit || 85;
		transitioningAttribute = transitioningAttribute || 'data-schwifty';

		let preserveAll = preserveAttributes === true;
		if (typeof preserveAttributes != 'object')
			preserveAttributes = {
				documentElement: preserveAll,
				head: preserveAll,
				body: preserveAll,
			};

		let preloadedClass = 'schwifty-preload';
		let linkRelStylesheet = 'link[rel="stylesheet"]';
		let doc = document;
		let html = doc.documentElement;
		let innerHTML = 'innerHTML';
		let cache = new Map();



		// Preload hrefs in the viewport
		let observer = new IntersectionObserver(
			(entries, self) =>
				entries.forEach(
					entry => {
						let intersecting = entry.isIntersecting;
						let href = entry.target.href;

						if (!intersecting && intersecting != undefined) return;
						// Delete oldest item in cache if limit is reached
						if (cache.size >= cacheLimit) cache.delete(cache.keys()[0]);
						// If page is already cached, unobserve target. Else, preload the page.
						cache.get(href) ? self.unobserve(entry.target) : preload(href);
					}
				),
			{ threshold: .5 }
		);



		// Helper functions
		let $ = (selector, context = doc) => context.querySelector(selector);
		let $$ = (selector, context = doc) => context.querySelectorAll(selector);
		let anchor = event => event.target.closest(selector) || {};
		let observeTargets = () => $$(selector).forEach(elem => observer.observe(elem));
		let dispatch = (eventName, context = window) => context.dispatchEvent(new Event(eventName));
		let seconds = string => string.replace(/m?s/gi, '');

		/**Gets computed transition time (delay + duration) from the documentElement and returns it in milliseconds */
		let getTransitionTime = () => {
			let style = getComputedStyle(html);
			return (seconds(style.transitionDelay) + seconds(style.transitionDuration)) * 1000;
		}



		/**Preload and cache page content */
		let preload = href => {
			if (!href) return;
			let xhttp = new XMLHttpRequest();

			// Add response to the cache
			xhttp.onreadystatechange = function () {
				if (this.status == 200) cache.set(href, xhttp.responseXML);
			}

			xhttp.open('GET', href, true);
			xhttp.responseType = 'document';
			xhttp.send();
		}



		/**Load page from cache and swap content */
		let load = href => {

			// Get matching preloaded item
			let preloaded = cache.get(href);
			if (!preloaded) { location = href; return }
			history.replaceState(null, null, href);

			// Prep stylesheets
			$$(`${linkRelStylesheet}:not(.${preloadedClass})`)
				.forEach(
					sheet => {

						let href = sheet.href.replace(location.origin, '');
						let alreadyLoaded = $(`${linkRelStylesheet}.${preloadedClass}[href="${href}"]`);
						let anticipated = $(`${linkRelStylesheet}[href="${href}"]`, preloaded);

						if (anticipated && !alreadyLoaded) {
							sheet.classList.add(preloadedClass);
							html.append(sheet);
						}
						if (!anticipated && alreadyLoaded)
							alreadyLoaded.remove();
					}
				);

			// Diff preloaded stylesheets with current stylesheets
			let selectCurrentStyleSheets = `${linkRelStylesheet}:not(.${preloadedClass})`;
			let selectPreloadedStylesheets = `${linkRelStylesheet}.${preloadedClass}`;
			let currentStyleSheets = $$(selectCurrentStyleSheets, preloaded);
			let preloadedStyleSheets = $$(selectPreloadedStylesheets);

			for (let preloadedSheet of preloadedStyleSheets) {
				if (
					!Array
						.from(currentStyleSheets)
						.some(s => s.href == preloadedSheet.href)
				)
					preloadedSheet.remove();
			}

			// Replace attributes on top-level elements
			['body', 'head', 'documentElement']
				.forEach(
					tagName => {
						if (preserveAttributes[tagName]) return;
						let elem = doc[tagName];
						for (let attr of elem.attributes)
							elem.removeAttribute(attr.name);
						for (let attr of preloaded[tagName].attributes)
							elem.setAttribute(attr.name, attr.value);
					}
				);

			// Transition out current page
			html.setAttribute(transitioningAttribute, 'out');
			dispatch('pagehide');
			dispatch('unload');
			setTimeout(
				() => {

					// Replace Content
					doc.body[innerHTML] = preloaded.body[innerHTML];
					doc.head[innerHTML] = preloaded.head[innerHTML];
					html.setAttribute(transitioningAttribute, 'in');

					// Dispatch some events
					dispatch('DOMContentLoaded', doc);

					// Callbacks
					if (!preserveScroll) scrollTo(0, 0);
					if (onload)
						onload.length
							? onload.map(func => func())
							: onload();
					observeTargets();

					setTimeout(() =>
						html.removeAttribute(transitioningAttribute),
						getTransitionTime()
					);

					// Dispatch some more events
					dispatch('load');
					dispatch('pageshow');

				},
				getTransitionTime()
			);
		}

		// Listen + Observe
		observeTargets();
		addEventListener('popstate', () => load(location.href));
		addEventListener('click', event => {
			let href = anchor(event).href;
			if (href) {
				event.preventDefault();
				dispatch('beforeunload');
				history.pushState(null, null, location.href);
				load(href);
			}
		});
	}
}