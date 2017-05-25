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

    // TODO: Improve memory usage (particularly for WebGL).
    // TODO: Is it really necessary to recreate the same data
    // TODO: in a Uint8Array, Uint8ClampedArray or ImageData Object
    // TODO: or can we just cut the fat?
    function fakeCanvas(canvas) {
        const origin = window.location.hostname;

        Math.seedrandom(origin);

        var ctx = HTMLCanvasElement.prototype.getContext.call(canvas, "2d") ||
            HTMLCanvasElement.prototype.getContext.call(canvas, "webgl") ||
            HTMLCanvasElement.prototype.getContext.call(canvas, "experimental-webgl") ||
            HTMLCanvasElement.prototype.getContext.call(canvas, "webgl2") ||
            HTMLCanvasElement.prototype.getContext.call(canvas, "experimental-webgl2");

        var pixels;

        if (ctx instanceof CanvasRenderingContext2D) {
            var image = originalGetImageData.call(ctx, 0, 0, canvas.width, canvas.height);
            pixels = image.data;
        }
        else if (ctx instanceof WebGLRenderingContext || ctx instanceof WebGL2RenderingContext) {
            // TODO: Fix memory usage here?
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
        }

        // TODO: Need a faster and more effective spoofing algorithm
        // TODO: Could the value be cached?
        for (var i = 0; i < pixels.length; i++) {
            pixels[i] += (randomBoolean() ? 1 : -1);
        }

        var fakeCanvas = canvas.cloneNode(true);
        var fakeCtx = fakeCanvas.getContext("2d");
        console.log("Fake Context Null? " + (fakeCtx === null));
        var image = new ImageData(pixels, canvas.width, canvas.height);
        fakeCtx.putImageData(image, 0, 0);
        return fakeCanvas;
    }

    CanvasRenderingContext2D.prototype.getImageData = function(sx, sy, sw, sh) {
        console.log("[ALERT] " + window.location.hostname + " called CanvasRenderingContext2D.getImageData()");

        const origin = window.location.hostname;

        Math.seedrandom(origin);

        var image = originalGetImageData.call(this, sx, sy, sw, sh);

        return randomiseImageData(image);
    };

/*
    WebGLRenderingContext.prototype.readPixels = function(x, y, width, height, format, type, pixels) {
        console.log("[ALERT] " + window.location.hostname + " called WebGLRenderingContext.readPixels()");

        const origin = window.location.hostname;

        Math.seedrandom(origin);

        originalReadPixels.call(this, x, y, width, height, format, type, pixels);

        if (format === WebGLRenderingContext.ALPHA) {
            if (type === WebGLRenderingContext.UNSIGNED_BYTE) {

            }
            else if (type === WebGLRenderingContext.UNSIGNED_SHORT_5_6_5) {

            }
            else if (type === WebGLRenderingContext.UNSIGNED_SHORT_4_4_4_4) {

            }
            else if (type === WebGLRenderingContext.UNSIGNED_SHORT_5_5_5_1) {

            }
        }
        else if (format === WebGLRenderingContext.RGB) {
            if (type === WebGLRenderingContext.UNSIGNED_BYTE) {

            }
            else if (type === WebGLRenderingContext.UNSIGNED_SHORT_5_6_5) {

            }
            else if (type === WebGLRenderingContext.UNSIGNED_SHORT_4_4_4_4) {

            }
            else if (type === WebGLRenderingContext.UNSIGNED_SHORT_5_5_5_1) {

            }
        }
        else if (format === WebGLRenderingContext.RGBA) {
            if (type === WebGLRenderingContext.UNSIGNED_BYTE) {

            }
            else if (type === WebGLRenderingContext.UNSIGNED_SHORT_5_6_5) {

            }
            else if (type === WebGLRenderingContext.UNSIGNED_SHORT_4_4_4_4) {

            }
            else if (type === WebGLRenderingContext.UNSIGNED_SHORT_5_5_5_1) {

            }
        }
    };
*/

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
