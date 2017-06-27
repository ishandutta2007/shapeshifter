"use strict";

// Methods to get HTTP headers
function getAcceptHeader(seed) {
	return "NotYetImplemented";
}
function getAcceptCharsetHeader(seed) {
	return "NotYetImplemented";
}
function getAcceptEncodingHeader(seed) {
	return "NotYetImplemented";
}
function getAcceptLanguageHeader(seed) {
	// NOTE: TOR Browser uses American English
	return "en-US,en;q=0.5";
}
function getAuthorizationHeader(seed) {
	return "NotYetImplemented";
}
function getExpectHeader(seed) {
	return "NotYetImplemented";
}
function getFromHeader(seed) {
	return "NotYetImplemented";
}
function getHostHeader(seed) {
	return "NotYetImplemented";
}
function getIfMatchHeader(seed) {
	return "NotYetImplemented";
}
function getIfModifiedSinceHeader(seed) {
	return "NotYetImplemented";
}
function getIfNoneMatchHeader(seed) {
	return "NotYetImplemented";
}
function getIfRangeHeader(seed) {
	return "NotYetImplemented";
}
function getIfUnmodifiedSinceHeader(seed) {
	return "NotYetImplemented";
}
function getMaxForwardsHeader(seed) {
	return "NotYetImplemented";
}
function getProxyAuthorizationHeader(seed) {
	return "NotYetImplemented";
}
function getRangeHeader(seed) {
	return "NotYetImplemented";
}
function getRefererHeader(seed) {
    Math.seedrandom(seed);

    const firstWord = words[randomNumber(0, words.length)];
    const secondWord = words[randomNumber(0, words.length)];
    const thirdWord = words[randomNumber(0, words.length)];
    const firstDirName = words[randomNumber(0, words.length)];
    const secondDirName = words[randomNumber(0, words.length)];
    const thirdDirName = words[randomNumber(0, words.length)];

    const protocols = ["https", "http"];

    const protocol = protocols[randomNumber(0, protocols.length)];

    const tlds = ["com", "net", "org", "gov", "info", "xxx"];

    const tld = tlds[randomNumber(0, tlds.length)];

    const referrer = protocol + "://www." + firstWord + secondWord + thirdWord + "." + tld + "/" + firstDirName + "/" + secondDirName + "/" + thirdDirName;

    return referrer;
}
function getTEHeader(seed) {
	return "NotYetImplemented";
}
function getUserAgentHeader(seed) {
    Math.seedrandom(seed);

	return userAgents[randomNumber(0, userAgents.length)];
}

function rewriteHttpHeaders(e) {
	// Create URL object from url string
    var serverUrl = new URL(e.url);

	// Get the origin (hostname)
    var origin = serverUrl.hostname;

	// Get a Storage object
	var storage = window.sessionStorage;

	// Do we already have a seed in sessionStorage for this origin or not?
	var seed = storage.getItem(origin);

	if (seed === null) {
		// Initialise a 32 byte buffer
		seed = new Uint8Array(32);

		// Fill it with cryptographically random values
		window.crypto.getRandomValues(seed);

		// Save it to sessionStorage
		storage.setItem(origin, seed);
	}

	console.log("Background - Seed for origin " + origin + ": " + seed);

	for (var header of e.requestHeaders) {
		if (header.name.toLowerCase() === "accept") {
		}
		else if (header.name.toLowerCase() === "accept-charset") {
		}
		else if (header.name.toLowerCase() === "accept-encoding") {
		}
		else if (header.name.toLowerCase() === "accept-language") {
            header.value = getAcceptLanguageHeader(seed);
		}
		else if (header.name.toLowerCase() === "authorization") {
		}
		else if (header.name.toLowerCase() === "expect") {
		}
		else if (header.name.toLowerCase() === "from") {
		}
		else if (header.name.toLowerCase() === "host") {
		}
		else if (header.name.toLowerCase() === "if-match") {
		}
		else if (header.name.toLowerCase() === "if-modified-since") {
		}
		else if (header.name.toLowerCase() === "if-none-match") {
		}
		else if (header.name.toLowerCase() === "if-range") {
		}
		else if (header.name.toLowerCase() === "if-unmodified-since") {
		}
		else if (header.name.toLowerCase() === "max-forwards") {
		}
		else if (header.name.toLowerCase() === "proxy-authorization") {
		}
		else if (header.name.toLowerCase() === "range") {
		}
		else if (header.name.toLowerCase() === "referer") {
			header.value = getRefererHeader(seed);
		}
		else if (header.name.toLowerCase() === "te") {
		}
		else if (header.name.toLowerCase() === "user-agent") {
			header.value = getUserAgentHeader(seed);
		}
	}

	return {requestHeaders: e.requestHeaders};
}

// Listen for HTTP requests
chrome.webRequest.onBeforeSendHeaders.addListener(rewriteHttpHeaders, {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);

// Content scripts need to know what seed to use for the PRNG
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var storage = window.sessionStorage;
	var seed = storage.getItem(request.hostname);
	sendResponse({"seed": seed});
});
