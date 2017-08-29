# Shape Shifter

Web extension designed to defeat browser fingerprinting. Spoofs HTTP request headers and javascript API properties.

This is a WIP (work in progress). Until further notice do not rely on this tool as a proper way to evade browser fingerprinting since I have not yet implemented counter actions to all of the known ways that browser fingerprinting can be achieved.

## Firefox

Download here: https://addons.mozilla.org/addon/shape-shifter/

OR

$ git clone https://github.com/Snapper26/shapeshifter.git  
Type "about:debugging" in your address bar.  
Click "Load Temporary Add-on".  
Navigate to the project root directory and choose the manifest.json file.  
Enjoy :)

## Chrome/Chromium

$ git clone https://github.com/Snapper26/shapeshifter.git  
Type "chrome://extensions/" in your address bar.  
Check "Developer Mode".  
Click "Load unpacked extension...".  
Navigate to the project root directory and choose the manifest.json file.  
Enjoy :)

## Releases

When I am confident that this extension has implemented enough functionality to be considered good enough for an initial release, I will upload it to the Google Chrome Web Store and the Mozilla Firefox Addons Site.  

## Features

Only the features listed here are implemented by shape shifter. If you do not see a feature, do NOT assume it is implemented:  

### HTTP Headers

The following headers are spoofed by shape shifter:

- Accept-Language
- Referer
- User-Agent

### Javascript API's

The following javascript objects/classes are spoofed by shape shifter

Navigator

| Property / Function | Spoofed |
|----------------------|----------------------|
| activeVRDisplays     | NO                   |
| appCodeName          | YES                  |
| appName              | YES                  |
| appVersion           | YES                  |
| battery              | NO                   |
| connection           | NO                   |
| geolocation          | NO                   |
| hardwareConcurrency  | YES                  |
| javaEnabled          | YES                  |
| language             | YES                  |
| languages            | YES                  |
| mimeTypes            | NO                   |
| onLine               | YES                  |
| oscpu                | YES                  |
| permissions          | NO                   |
| platform             | YES                  |
| plugins              | NO                   |
| product              | YES                  |
| serviceWorker        | NO                   |
| storage              | NO                   |
| userAgent            | YES                  |

History

| Property / Function | Spoofed |
|----------------------|----------------------|
| length               | YES                  |

Document

| Property / Function | Spoofed |
|----------------------|----------------------|
| referrer             | YES                  |

AnalyserNode

| Property / Function | Spoofed |
|--------------------------|----------------------|
| getFloatFrequencyData()  | YES                  |
| getByteFrequencyData()   | YES                  |
| getFloatTimeDomainData() | YES                  |
| getByteTimeDomainData()  | YES                  |

BatteryManager

| Property / Function | Spoofed |
|----------------------|----------------------|
| charging             | YES                  |
| chargingTime         | YES                  |
| dischargingTime      | YES                  |
| level                | YES                  |

HTMLCanvasElement

| Property / Function | Spoofed |
|----------------------|----------------------|
| toDataURL()          | YES                  |
| toBlob()             | YES                  |
| mozGetAsFile()       | YES                  |

CanvasRenderingContext2D

| Property / Function | Spoofed |
|----------------------|----------------------|
| getImageData()       | YES                  |

WebGLRenderingContext

| Property / Function | Spoofed |
|----------------------|----------------------|
| readPixels()         | YES                  |

WebGL2RenderingContext

| Property / Function | Spoofed |
|----------------------|----------------------|
| readPixels()         | YES                  |
