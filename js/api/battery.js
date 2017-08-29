(function() {
    'use strict';

    // NOTE: Mozilla Firefox has disabled the Battery Status API as of Firefox 52
    // NOTE: Chrome/Chromium probably still has it enabled.

    function fakeCharging() {
      return false;
    }
    function fakeChargingTime() {
      return 0;
    }
    function fakeDischargingTime() {
      return Infinity;
    }
    function fakeLevel() {
      return 1.0;
    }

    const fakeChargingValue        = fakeCharging();
    const fakeChargingTimeValue    = fakeChargingTime();
    const fakeDischargingValue     = fakeDischargingTime();
    const fakeLevelValue           = fakeLevel();

    Object.defineProperties(BatteryManager.prototype, {
        charging: {
            configurable: true,
            enumerable: true,
            get: function getCharging() {
                console.log("[ALERT] " + window.location.hostname + " accessed property BatteryManager.charging");

                return fakeChargingValue;
            }
        },

        // TODO: This value could be infinity, if device is not charging
        chargingTime: {
            configurable: true,
            enumerable: true,
            get: function getChargingTime() {
                console.log("[ALERT] " + window.location.hostname + " accessed property BatteryManager.chargingTime");

                return fakeChargingTimeValue;
            }
        },

        // TODO: This value could be infinity, if device is charging
        dischargingTime: {
            configurable: true,
            enumerable: true,
            get: function getDischargingTime() {
                console.log("[ALERT] " + window.location.hostname + " accessed property BatteryManager.dischargingTime");

                return fakeDischargingValue;
            }
        },

        // TODO: This could return any decimal number between 0.0 and 1.0 inclusive
        level: {
            configurable: true,
            enumerable: true,
            get: function getLevel() {
                console.log("[ALERT] " + window.location.hostname + " accessed property BatteryManager.level");

                return fakeLevelValue;
            }
        }
    });
})();
