(function(){
    'use strict';

    // Real methods from HTMLCanvasElement
    var originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    var originalToBlob = HTMLCanvasElement.prototype.toBlob;
    var originalMozGetAsFile = HTMLCanvasElement.prototype.mozGetAsFile;

    // Real methods from CanvasRenderingContext2D
    var originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;

    // Real methods from WebGLRenderingContext
    var originalReadPixels = WebGLRenderingContext.prototype.readPixels;

    // Real methods from WebGL2RenderingContext
    var originalReadPixelsTwo = WebGL2RenderingContext.prototype.readPixels;

    // Fake data from an ImageData object
    function fakeImageData(image) {
        Math.seedrandom(seed);

        // TODO: Need a faster and more effective spoofing algorithm
        // TODO: Could the value be cached?
        for (var i = 0; i < image.data.length; i++) {
            image.data[i] += (randomBoolean() ? 1 : -1);
        }

        return image;
    }

    // Fake data from an ArrayBufferView object
    function fakePixelData(pixels) {
        Math.seedrandom(seed);

        // TODO: Need a faster and more effective spoofing algorithm
        // TODO: Could the value be cached?
        for (var i = 0; i < pixels.length; i++) {
            pixels[i] += (randomBoolean() ? 1 : -1);
        }

        return pixels;
    }

    // Replace the real canvas reference with a fake one
    function fakeCanvas(canvas) {
        // First get a reference to the correct context type for "this" canvas
        var ctx = HTMLCanvasElement.prototype.getContext.call(canvas, "2d") ||
            HTMLCanvasElement.prototype.getContext.call(canvas, "webgl") ||
            HTMLCanvasElement.prototype.getContext.call(canvas, "experimental-webgl") ||
            HTMLCanvasElement.prototype.getContext.call(canvas, "webgl2") ||
            HTMLCanvasElement.prototype.getContext.call(canvas, "experimental-webgl2");

        var pixels;

        // Extract the pixel data. Method varies depending on the rendering context's type
        if (ctx instanceof CanvasRenderingContext2D) {
            var image = originalGetImageData.call(ctx, 0, 0, canvas.width, canvas.height);
            pixels = image.data;
        }
        else if (ctx instanceof WebGLRenderingContext || ctx instanceof WebGL2RenderingContext) {
            // TODO: Improve memory usage (particularly for WebGL).
            // TODO: Is it really necessary to recreate the same data
            // TODO: in a Uint8Array, Uint8ClampedArray or ImageData Object
            // TODO: or can we just cut the fat?
            var image = new ImageData(canvas.width, canvas.height);
            var data = new Uint8Array(image.data.length);
            originalReadPixels.call(ctx, 0, 0, canvas.width, canvas.height, ctx.RGBA, ctx.UNSIGNED_BYTE, data);
            pixels = new Uint8ClampedArray(image.data.length);
            for (var i = 0; i < pixels.length; i++) {
                pixels[i] = data[i];
            }
        }
        else if (ctx instanceof ImageBitmapRenderingContext) {
            // No methods for pixel data extraction. Nothing to do here ...
            // TODO: variable pixels should still be initialised to something here
        }

        // Fake the underlying pixel data
        var fakePixels = fakePixelData(pixels);

        // Create a deep copy (clone) of the canvas
        var fakeCanvas = canvas.cloneNode(true);

        // Get a 2D context to draw on the fake canvas
        var fakeCtx = fakeCanvas.getContext("2d");

        // Build a new ImageData object using the fake pixel data
        var image = new ImageData(fakePixels, canvas.width, canvas.height);

        // Obscure the canvas with fake pixel data
        fakeCtx.putImageData(image, 0, 0);

        return fakeCanvas;
    }

    // CanvasRenderingContext2D specific method for extracting image data from a canvas.
    CanvasRenderingContext2D.prototype.getImageData = function(sx, sy, sw, sh) {
        console.log("[ALERT] " + window.location.hostname + " called CanvasRenderingContext2D.getImageData()");

        var image = originalGetImageData.call(this, sx, sy, sw, sh);

        return fakeImageData(image);
    };

    // WebGLRenderingContext specific method for extracting pixel data from a canvas.
    WebGLRenderingContext.prototype.readPixels = function(x, y, width, height, format, type, pixels) {
        console.log("[ALERT] " + window.location.hostname + " called WebGLRenderingContext.readPixels()");

        originalReadPixels.call(this, x, y, width, height, format, type, pixels);

        fakePixelData(pixels);
    };

    // WebGL2RenderingContext specific method for extracting pixel data from a canvas.
    WebGL2RenderingContext.prototype.readPixels = function(x, y, width, height, format, type, pixels) {
        console.log("[ALERT] " + window.location.hostname + " called WebGL2RenderingContext.readPixels()");

        originalReadPixelsTwo.call(this, x, y, width, height, format, type, pixels);

        fakePixelData(pixels);
    };

    // HTMLCanvasElement methods. These work on a HTMLCanvasElement object.
    HTMLCanvasElement.prototype.toDataURL = function(type, encoderOptions) {
        console.log("[ALERT] " + window.location.hostname + " called HTMLCanvasElement.toDataURL()");

        var fake = fakeCanvas(this);

        return originalToDataURL.call(fake, type, encoderOptions);
    };

    HTMLCanvasElement.prototype.toBlob = function(callback, mimeType, qualityArgument) {
        console.log("[ALERT] " + window.location.hostname + " called HTMLCanvasElement.toBlob()");

        var fake = fakeCanvas(this);

        originalToBlob.call(fake, callback, mimeType, qualityArgument);
    };

    HTMLCanvasElement.prototype.mozGetAsFile = function(name, type) {
        console.log("[ALERT] " + window.location.hostname + " called HTMLCanvasElement.mozGetAsFile()");

        var fake = fakeCanvas(this);

        return originalMozGetAsFile.call(fake, name, type);
    };
})();
