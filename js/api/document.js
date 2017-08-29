(function() {
    'use strict';

    function fakeReferrer() {
      // NOTE: From https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer
    	// NOTE: The value is an empty string if the user navigated to the page directly (not through a link, but, for example, via a bookmark).
    	// NOTE: Since this property returns only a string, it does not give you DOM access to the referring page.

    	// NOTE: Make websites think we always go to them directly rather than being referred.
    	return "";
    }

    const fakeReferrerValue = fakeReferrer();

    Object.defineProperties(window.document, {
        referrer: {
            configurable: true,
            enumerable: true,
            get: function getReferrer() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Document.referrer");

                return fakeReferrerValue;
            }
        }
    });
})();
