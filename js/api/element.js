(function(){
    'use strict';

    // Real methods from Element
    var originalGetClientRects = Element.prototype.getClientRects;
    var originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

    // Fake data for a DOMRect object
    function fakeRectangleData(rectangle) {
        Math.seedrandom(seed);

        if (!rectangle.hasOwnProperty('x')) {
            // TODO: Object.defineProperty() ?
            rectangle.x = rectangle.left;
        }

        if (!rectangle.hasOwnProperty('y')) {
            // TODO: Object.defineProperty() ?
            rectangle.y = rectangle.top;
        }

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
        var rectangleList = originalGetClientRects.call(this);

        for (var i = 0; i < rectangleList.length; i++) {
            rectangleList[i] = fakeRectangleData(rectangleList[i]);
        }

        return rectangleList;
    };

    Element.prototype.getBoundingClientRect = function() {
        var rectangle = originalGetBoundingClientRect.call(this);

        return fakeRectangleData(rectangle);
    };
})();
