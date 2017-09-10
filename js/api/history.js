(function() {
    'use strict';

    var seed = document.currentScript.getAttribute("data-seed");

    function fakeLength(seed) {
      return 0;
    }

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
