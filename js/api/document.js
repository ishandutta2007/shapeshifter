(function() {
    'use strict';

    // TODO: The javascript referrer is set to a fake value even when the HTTP header is not set.
    // TODO: They should always have the same value, even if both have no value.
    // TODO: Either force a fake HTTP referer header or check to see if the javascript one has a
    // TODO: value first before faking it.

    // TODO: Also review whether it is a good idea to be spoofing the referrer in the first place?
    function fakeReferrer(seed) {
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

    const fakeReferrerValue = fakeReferrer(seed);

    Object.defineProperties(window.document, {
        referrer: {
            configurable: false,
            enumerable: true,
            get: function getReferrer() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Document.referrer");

                return fakeReferrerValue;
            }
        }
    });
})();
