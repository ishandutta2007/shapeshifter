function inject(filePath, callback) {
    var script = document.createElement('script');
    script.src = chrome.extension.getURL(filePath);
    script.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(script);

    callback();
}

inject("js/ua.js", function() {

    console.log("[INFO] Injected UA ...");

    inject("js/words.js", function() {

        console.log("[INFO] Injected Words ...");

        inject("js/lang.js", function() {

            console.log("[INFO] Injected Lang ...");

            inject("js/lib/seedrandom.min.js", function() {

                console.log("[INFO] Injected Seed Random ...");

                inject("js/random.js", function() {

                    console.log("[INFO] Injected Random ...");

                    inject("js/api/document.js", function() {
                        console.log("[INFO] Injected Document API ...");
                    });
                    inject("js/api/navigator.js", function() {
                        console.log("[INFO] Injected Navigator API ...");
                    });
                    inject("js/api/canvas.js", function() {
                        console.log("[INFO] Injected Canvas API ...");
                    });
                    inject("js/api/history.js", function() {
                        console.log("[INFO] Injected History API ...");
                    });
                    inject("js/api/battery.js", function() {
                        console.log("[INFO] Injected Battery API ...");
                    });
                    inject("js/api/audio.js", function() {
                        console.log("[INFO] Injected Audio API ...");
                    });
                });
            });
        });
    });
});
