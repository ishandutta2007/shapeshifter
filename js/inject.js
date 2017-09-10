console.log("Content Script Running ...");

function inject(filePath, seed) {
  // Dynamically create a script
  var script = document.createElement('script');

  // Give the script a seed value to use for spoofing
  script.setAttribute("data-seed", seed);

  // Give the script a url to the javascript code to run
  script.src = chrome.extension.getURL(filePath);

  // Listen for the script loading event
  script.onload = function() {
    // Remove the script from the page so the page scripts don't see it
    this.remove();
  };

  // Add the script tag to the DOM
  (document.head || document.documentElement).appendChild(script);
}

function getSeed(origin) {
	// Get a Storage object
	var storage = window.sessionStorage;

	// Try to get a seed from sessionStorage
	var seed = storage.getItem(origin);

  // Do we already have a seed in storage for this origin or not?
	if (seed === null) {
		// Initialise a 32 byte buffer
		seed = new Uint8Array(32);

		// Fill it with cryptographically random values
		window.crypto.getRandomValues(seed);

		// Save it to storage
		storage.setItem(origin, seed);
	}

	return seed;
}

var seed = getSeed(window.location.hostname);

// TODO: Still fails to inject into a sandboxed iframe
// TODO: on chromium/chrome.

// TODO: Still can see real values for navigator (and probably other objects)
// TODO: when using the iframe.contentWindow method.
inject("js/lib/seedrandom.js", seed);
console.log("[INFO] Injected Seed Random ...");

inject("js/random.js", seed);
console.log("[INFO] Injected Random ...");

inject("js/api/document.js", seed);
console.log("[INFO] Injected Document API ...");

inject("js/api/navigator.js", seed);
console.log("[INFO] Injected Navigator API ...");

inject("js/api/canvas.js", seed);
console.log("[INFO] Injected Canvas API ...");

inject("js/api/history.js", seed);
console.log("[INFO] Injected History API ...");

inject("js/api/battery.js", seed);
console.log("[INFO] Injected Battery API ...");

inject("js/api/audio.js", seed);
console.log("[INFO] Injected Audio API ...");

// TODO: Messing with client rectangles prevents logging into
// TODO: https://twitter.com/.
// TODO: Either ditch entirely or fix properly.
//inject("js/api/element.js", seed);
//console.log("[INFO] Injected Element API ...");
