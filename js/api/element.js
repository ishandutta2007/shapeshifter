(function(){
    'use strict';

    // Real methods from Element
    var originalGetClientRects = Element.prototype.getClientRects;
    var originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

    // Fake data for a DOMRect object
    function fakeRectangleData(rectangle) {
        Math.seedrandom(seed);

        if (!rectangle.hasOwnProperty('x')) {
            rectangle.x = rectangle.left;
        }

        if (!rectangle.hasOwnProperty('y')) {
            rectangle.y = rectangle.top;
        }

        // TODO: Perhaps add/subtract more precise units e.g.
        // TODO: 0.1
        // TODO: 0.01
        // TODO: 0.001
        // TODO: 0.0001
        // TODO: etc ...
        return Object.defineProperties(rectangle, {
            width: {
                configurable: false,
                enumerable: true,
                writable: false,
                value: rectangle.width + (randomBoolean() ? 1 : -1)
            },
            height: {
                configurable: false,
                enumerable: true,
                writable: false,
                value: rectangle.height + (randomBoolean() ? 1 : -1)
            },
            top: {
                configurable: false,
                enumerable: true,
                writable: false,
                value: rectangle.top + (randomBoolean() ? 1 : -1)
            },
            right: {
                configurable: false,
                enumerable: true,
                writable: false,
                value: rectangle.right + (randomBoolean() ? 1 : -1)
            },
            bottom: {
                configurable: false,
                enumerable: true,
                writable: false,
                value: rectangle.bottom + (randomBoolean() ? 1 : -1)
            },
            left: {
                configurable: false,
                enumerable: true,
                writable: false,
                value: rectangle.left + (randomBoolean() ? 1 : -1)
            }
        });
    }

    // Element methods. These work on an Element object.
    Element.prototype.getClientRects = function() {
        console.log("[ALERT] " + window.location.hostname + " accessed property Element.getClientRects()");

        var rectangleList = originalGetClientRects.call(this);

        for (var i = 0; i < rectangleList.length; i++) {
            rectangleList[i] = fakeRectangleData(rectangleList[i]);
        }

        return rectangleList;
    };

    Element.prototype.getBoundingClientRect = function() {
        console.log("[ALERT] " + window.location.hostname + " accessed property Element.getBoundingClientRect()");

        var rectangle = originalGetBoundingClientRect.call(this);

        return fakeRectangleData(rectangle);
    };
})();
