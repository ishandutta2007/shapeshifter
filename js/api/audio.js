(function(){
    'use strict';

    // Read methods from AnalyserNode
    var originalGetFloatFrequencyData = AnalyserNode.prototype.getFloatFrequencyData;
    var originalGetByteFrequencyData = AnalyserNode.prototype.getByteFrequencyData;
    var originalGetFloatTimeDomainData = AnalyserNode.prototype.getFloatTimeDomainData;
    var originalGetByteTimeDomainData = AnalyserNode.prototype.getByteTimeDomainData;

    // Fake data from an ArrayBufferView object
    function fakeAudioData(data) {
        const origin = window.location.hostname;

        Math.seedrandom(origin);

        // TODO: Need a faster and more effective spoofing algorithm
        // TODO: Could the value be cached?
        for (var i = 0; i < data.length; i++) {
            data[i] += (randomBoolean() ? 1 : -1);
        }
    }

    // AnalyserNode methods. These work on a AnalyserNode object.
    AnalyserNode.prototype.getFloatFrequencyData = function(array) {
        console.log("[ALERT] " + window.location.hostname + " called AnalyserNode.getFloatFrequencyData()");

        originalGetFloatFrequencyData.call(this, array);

        fakeAudioData(array);
    };

    AnalyserNode.prototype.getByteFrequencyData = function(array) {
        console.log("[ALERT] " + window.location.hostname + " called AnalyserNode.getByteFrequencyData()");

        originalGetByteFrequencyData.call(this, array);

        fakeAudioData(array);
    };

    AnalyserNode.prototype.getFloatTimeDomainData = function(array) {
        console.log("[ALERT] " + window.location.hostname + " called AnalyserNode.getFloatTimeDomainData()");

        originalGetFloatTimeDomainData.call(this, array);

        fakeAudioData(array);
    };

    AnalyserNode.prototype.getByteTimeDomainData = function(array) {
        console.log("[ALERT] " + window.location.hostname + " called AnalyserNode.getByteTimeDomainData()");

        originalGetByteTimeDomainData.call(this, array);

        fakeAudioData(array);
    };
})();
