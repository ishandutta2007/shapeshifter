console.log("Content Script Running ...");

function inject(filePath) {
  var script = document.createElement('script');
  script.src = chrome.extension.getURL(filePath);
  script.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);
}

function injectText(text) {
  var script = document.createElement('script');
  script.textContent = text;
  script.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);
}

function getSeed(origin) {
	// Get a Storage object
	var storage = window.sessionStorage;

	// Do we already have a seed in storage for this origin or not?
	var seed = storage.getItem(origin);

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

var origin = window.location.hostname;

var seed = getSeed(origin);

injectText("var seed = '" + seed + "';");
console.log("[INFO] Injected Seed ...");

inject("js/lib/seedrandom.min.js");
console.log("[INFO] Injected Seed Random ...");

inject("js/random.js");
console.log("[INFO] Injected Random ...");

inject("js/api/document.js");
console.log("[INFO] Injected Document API ...");

inject("js/api/navigator.js");
console.log("[INFO] Injected Navigator API ...");

inject("js/api/canvas.js");
console.log("[INFO] Injected Canvas API ...");

inject("js/api/history.js");
console.log("[INFO] Injected History API ...");

inject("js/api/battery.js");
console.log("[INFO] Injected Battery API ...");

inject("js/api/audio.js");
console.log("[INFO] Injected Audio API ...");

inject("js/api/element.js");
console.log("[INFO] Injected Element API ...");
