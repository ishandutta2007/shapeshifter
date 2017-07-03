(function() {
    'use strict';

    const origin = window.location.hostname;

    console.log("Page - Seed for origin " + origin + ": " + seed);

    function fakeActiveVRDisplays(seed) {       Math.seedrandom(seed); return randomString(32, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"); }
    function fakeAppCodeName(seed) {            Math.seedrandom(seed); return randomString(32, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"); }
    function fakeAppName(seed) {                Math.seedrandom(seed); return randomString(32, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"); }

    // TODO: Is always returning "5.0" safe?
    function fakeAppVersion(seed) {
        return "5.0";
    }
    function fakeBattery(seed) {                Math.seedrandom(seed); return randomString(32, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"); }
    function fakeConnection(seed) {             Math.seedrandom(seed); return randomString(32, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"); }
    function fakeGeoLocation(seed) {            Math.seedrandom(seed); return randomString(32, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"); }
    function fakeHardwareConcurrency(seed) {    Math.seedrandom(seed); return randomNumber(0, 9); }
    function fakeJavaEnabled(seed) {            Math.seedrandom(seed); return randomBoolean(); }
    function fakeLanguage(seed) {
        // NOTE: TOR Browser uses American English
        return "en-US";
    }
    function fakeLanguages(seed) {
        // NOTE: TOR Browser uses American English
        return "en-US,en";
    }
    function fakeMimeTypes(seed) {              Math.seedrandom(seed); return randomString(32, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"); }
    function fakeOnLine(seed) {                 Math.seedrandom(seed); return randomBoolean(); }
    function fakeOscpu(seed) {                  Math.seedrandom(seed); return randomString(32, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"); }
    function fakePermissions(seed) {            Math.seedrandom(seed); return randomString(32, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"); }
    function fakePlatform(seed) {               Math.seedrandom(seed); return randomString(32, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"); }
    function fakePlugins(seed) {
        Math.seedrandom(seed);

        var pluginsList = window.navigator.plugins;

        // TODO: Fake plugins?
        return pluginsList;
    }
    function fakeProduct(seed) {                Math.seedrandom(seed); return randomString(32, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"); }
    function fakeServiceWorker(seed) {          Math.seedrandom(seed); return randomString(32, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"); }
    function fakeStorage(seed) {                Math.seedrandom(seed); return randomString(32, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"); }
    function fakeUserAgent(seed) {
        Math.seedrandom(seed);

    	return userAgents[randomNumber(0, userAgents.length)];
    }

    const fakeActiveVRDisplaysValue       = fakeActiveVRDisplays(seed);
    const fakeAppCodeNameValue            = fakeAppCodeName(seed);
    const fakeAppNameValue                = fakeAppName(seed);
    const fakeAppVersionValue             = fakeAppVersion(seed);
    const fakeBatteryValue                = fakeBattery(seed);
    const fakeConnectionValue             = fakeConnection(seed);
    const fakeGeoLocationValue            = fakeGeoLocation(seed);
    const fakeHardwareConcurrencyValue    = fakeHardwareConcurrency(seed);
    const fakeJavaEnabledValue            = fakeJavaEnabled(seed);
    const fakeLanguageValue               = fakeLanguage(seed);
    const fakeLanguagesValue              = fakeLanguages(seed);
    const fakeMimeTypesValue              = fakeMimeTypes(seed);
    const fakeOnLineValue                 = fakeOnLine(seed);
    const fakeOscpuValue                  = fakeOscpu(seed);
    const fakePermissionsValue            = fakePermissions(seed);
    const fakePlatformValue               = fakePlatform(seed);
    const fakePluginsValue                = fakePlugins(seed);
    const fakeProductValue                = fakeProduct(seed);
    const fakeServiceWorkerValue          = fakeServiceWorker(seed);
    const fakeStorageValue                = fakeStorage(seed);
    const fakeUserAgentValue              = fakeUserAgent(seed);

    Object.defineProperties(window.navigator, {
        /*
        activeVRDisplays: {
            configurable: false,
            enumerable: true,
            get: function getActiveVRDisplays() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.activeVRDisplays");

                return fakeActiveVRDisplaysValue;
            }
        },
        appCodeName: {
            configurable: false,
            enumerable: true,
            get: function getAppCodeName() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.appCodeName");

                return fakeAppCodeNameValue;
            }
        },
        appName: {
            configurable: false,
            enumerable: true,
            get: function getAppName() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.appName");

                return fakeAppNameValue;
            }
        },
        */

        appVersion: {
            configurable: false,
            enumerable: true,
            get: function getAppVersion() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.appVersion");

                return fakeAppVersionValue;
            }
        },

        // TODO: This is getBattery() now
        /*
        battery: {
            configurable: false,
            enumerable: true,
            get: function getBattery() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.battery");

                return fakeBatteryValue;
            }
        },
        connection: {
            configurable: false,
            enumerable: true,
            get: function getConnection() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.connection");

                return fakeConnectionValue;
            }
        },
        geolocation: {
            configurable: false,
            enumerable: true,
            get: function getGeoLocation() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.geolocation");

                return fakeGeoLocationValue;
            }
        },
        */

        hardwareConcurrency: {
            configurable: false,
            enumerable: true,
            get: function getHardwareConcurrency() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.hardwareConcurrency");

                return fakeHardwareConcurrencyValue;
            }
        },

        // TODO: javaEnabled() is a method, not a property
        /*
        javaEnabled: {
            configurable: false,
            enumerable: true,
            get: function getJavaEnabled() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.javaEnabled");

                return fakeJavaEnabledValue;
            }
        },
        */

        language: {
            configurable: false,
            enumerable: true,
            get: function getLanguage() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.language");

                return fakeLanguageValue;
            }
        },
        languages: {
            configurable: false,
            enumerable: true,
            get: function getLanguages() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.languages");

                return fakeLanguagesValue;
            }
        },

        /*
        mimeTypes: {
            configurable: false,
            enumerable: true,
            get: function getMimeTypes() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.mimeTypes");

                return fakeMimeTypesValue;
            }
        },
        onLine: {
            configurable: false,
            enumerable: true,
            get: function getOnLine() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.onLine");

                return fakeOnLineValue;
            }
        },
        */

        oscpu: {
            configurable: false,
            enumerable: true,
            get: function getOscpu() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.oscpu");

                return fakeOscpuValue;
            }
        },

        /*
        permissions: {
            configurable: false,
            enumerable: true,
            get: function getPermissions() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.permissions");

                return fakePermissionsValue;
            }
        },
        */

        platform: {
            configurable: false,
            enumerable: true,
            get: function getPlatform() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.platform");

                return fakePlatformValue;
            }
        },

        /*
        plugins: {
            configurable: false,
            enumerable: true,
            get: function getPlugins() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.plugins");

                return fakePluginsValue;
            }
        },
        product: {
            configurable: false,
            enumerable: true,
            get: function getProduct() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.product");

                return fakeProductValue;
            }
        },
        serviceWorker: {
            configurable: false,
            enumerable: true,
            get: function getServiceWorker() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.serviceWorker");

                return fakeServiceWorkerValue;
            }
        },
        storage: {
            configurable: false,
            enumerable: true,
            get: function getStorage() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.storage");

                return fakeStorageValue;
            }
        },
        */

        userAgent: {
            configurable: false,
            enumerable: true,
            get: function getUserAgent() {
                console.log("[ALERT] " + window.location.hostname + " accessed property Navigator.userAgent");

                return fakeUserAgentValue;
            }
        }
    });
})();
