"use strict";

console.log("Background Script Running ...");

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
function getAcceptLanguageHeader() {
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
function getRefererHeader() {
	// NOTE: From https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer
	// NOTE: The value is an empty string if the user navigated to the page directly (not through a link, but, for example, via a bookmark).
	// NOTE: Since this property returns only a string, it does not give you DOM access to the referring page.

	// NOTE: Make websites think we always go to them directly rather than being referred.
	return "";
}
function getTEHeader(seed) {
	return "NotYetImplemented";
}
function getUserAgentHeader() {
	// NOTE: Current TOR User Agent as of 19 July 2017
	// NOTE: This will need constant updating.
	// NOTE: As TOR changes firefox versions each update,
	// NOTE: Shape Shifter will need to keep up.
	return "Mozilla/5.0 (Windows NT 6.1; rv:52.0) Gecko/20100101 Firefox/52.0";
}

function rewriteHttpHeaders(e) {
	for (var header of e.requestHeaders) {
		if (header.name.toLowerCase() === "accept") {
		}
		else if (header.name.toLowerCase() === "accept-charset") {
		}
		else if (header.name.toLowerCase() === "accept-encoding") {
		}
		else if (header.name.toLowerCase() === "accept-language") {
            header.value = getAcceptLanguageHeader();
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
			header.value = getRefererHeader();
		}
		else if (header.name.toLowerCase() === "te") {
		}
		else if (header.name.toLowerCase() === "user-agent") {
			header.value = getUserAgentHeader();
		}
	}

	return {requestHeaders: e.requestHeaders};
}

chrome.webRequest.onBeforeSendHeaders.addListener(rewriteHttpHeaders, {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);
