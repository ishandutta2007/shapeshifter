function inject(filePath, callback) {
    var script = document.createElement('script');
    script.src = chrome.extension.getURL(filePath);
    script.onload = function() {
        //this.remove(); //TODO: What does this actually do?
    };
    (document.head || document.documentElement).appendChild(script);

    callback();
}

// TODO: Investigate possible race conditions with script injection
// TODO: Page seems to be able to get values before they can be spoofed
// TODO: Still not sure why?

const origin = window.location.hostname;

chrome.runtime.sendMessage({"hostname": origin}, function(response) {
    console.log("Content - Seed for origin " + origin + ": " + response.seed);

    // TODO: This looks messy, perhaps clean it up a bit?
    var seedScript = "const seed = '" + response.seed + "';";

    console.log(seedScript);

    var script = document.createElement('script');
    script.textContent = seedScript;
    script.onload = function() {
        //this.remove(); //TODO: What does this actually do?
    };
    (document.head || document.documentElement).appendChild(script);

    injectSeedJsCallback();
});

function injectSeedJsCallback() {
    console.log("[INFO] Injected Seed");
    inject("js/ua.js", injectUaJsCallback);
}

function injectUaJsCallback() {
    console.log("[INFO] Injected UA ...");
    inject("js/words.js", injectWordsJsCallback);
}

function injectWordsJsCallback() {
    console.log("[INFO] Injected Words ...");
    inject("js/lib/seedrandom.min.js", injectSeedRandomJsCallback);
}

function injectSeedRandomJsCallback() {
    console.log("[INFO] Injected Seed Random ...");
    inject("js/random.js", injectRandomJsCallback);
}

function injectRandomJsCallback() {
    console.log("[INFO] Injected Random ...");
    inject("js/api/document.js", injectDocumentJsCallback);
    inject("js/api/navigator.js", injectNavigatorJsCallback);
    inject("js/api/canvas.js", injectCanvasJsCallback);
    inject("js/api/history.js", injectHistoryJsCallback);
    inject("js/api/battery.js", injectBatteryJsCallback);
    inject("js/api/audio.js", injectAudioJsCallback);
    inject("js/api/element.js", injectElementJsCallback);
}

function injectDocumentJsCallback() {
    console.log("[INFO] Injected Document API ...");
}

function injectNavigatorJsCallback() {
    console.log("[INFO] Injected Navigator API ...");
}

function injectCanvasJsCallback() {
    console.log("[INFO] Injected Canvas API ...");
}

function injectHistoryJsCallback() {
    console.log("[INFO] Injected History API ...");
}

function injectBatteryJsCallback() {
    console.log("[INFO] Injected Battery API ...");
}

function injectAudioJsCallback() {
    console.log("[INFO] Injected Audio API ...");
}

function injectElementJsCallback() {
    console.log("[INFO] Injected Element API ...");
}
