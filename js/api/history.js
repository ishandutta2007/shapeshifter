(function() {
    'use strict';

    function fakeLength(seed) { Math.seedrandom(seed); return randomNumber(0, 256); }

    const fakeLengthValue = fakeLength(seed);

    Object.defineProperties(window.history, {
        length: {
            configurable: false,
            enumerable: true,
            get: function getLength() {
                console.log("[ALERT] " + window.location.hostname + " accessed property History.length");

                return fakeLengthValue;
            }
        }
    });
})();
