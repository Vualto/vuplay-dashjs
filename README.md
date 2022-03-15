# Studio DRM dash.js

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Built with Grunt](http://cdn.gruntjs.com/builtwith.svg)](https://gruntjs.com/)

## Description

This repository will demonstrate how to use [Studio DRM](https://jw-studio-drm-docs) with [dash.js](https://github.com/Dash-Industry-Forum/dash.js/wiki).
If you have any questions please contact <support@jwplayer.com>

This repository is currently targeted at [version 4.3.0](https://github.com/Dash-Industry-Forum/dash.js/releases/tag/v4.3.0) of dash.js.

## Instructions

### Install dependencies

1. Install [npm](https://www.npmjs.com/)
2. Install the [grunt-cli](https://www.npmjs.com/package/grunt-cli): `npm install -g grunt-cli`
#### TODO: Change the below (no.3) to the JW GitHub repo structure name
3. Clone the repository: `git clone git@github.com:Vualto/vuplay-dashjs.git`
4. Navigate to the project's root folder: `cd studiodrm-dashjs`
5. Install the dependencies: `npm install`

### Build and run the dev environment

1. Open the repository in your favourite javascript editor.
2. In file `src/studiodrm-dashjs.js` replace `<your-stream-url>` with your stream URL. This must be a [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP) stream.
3. In file `src/studiodrm-dashjs.js` replace `<your-studiodrm-token>` with a Studio DRM token from [https://jw-studio-drm-token-docs](studiodrm-token-docs)
4. Run `npm run build` in the project's root. This will create a `dist` folder that contains all the files needed to run this demo. N.B. You will need to add the host `dashjs.studiodrm.local` to your local machine's hosts file in order for this to work.
5. Load a supported browser and go to `https://dashjs.studiodrm.local:14703`

NB: In order to allow DRM encrypted playback in chrome (<https://goo.gl/EEhZqT>), SSL has been enabled for the demo. You will get a warning about an invalid cert `NET::ERR_CERT_AUTHORITY_INVALID` but this can safely be ignored.

### Browser support

The browser must support [encrypted media extensions](https://www.w3.org/TR/2016/CR-encrypted-media-20160705/).
Currently this includes the latest versions of Chrome, Firefox, Internet Explorer 11 and Edge.
For a complete breakdown of supported media extensions please contact <support@jwplayer.com>

## Useful links

### Studio DRM

-   [Contact JW Player](https://support.jwplayer.com/)
#### TODO: Change the below to the JW Studio DRM docs
-   [Studio DRM](https://jw-studio-drm-docs)
-   [Studio DRM token documentation](https://jw-studio-drm-token-docs)

### mpeg-DASH

-   [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP)
-   [What is MPEG-DASH](https://www.streamingmedia.com/Articles/Editorial/What-Is-.../What-is-MPEG-DASH-79041.aspx)

### Encrpyted media extensions

-   [Encrypted media extensions specification](https://www.w3.org/TR/2016/CR-encrypted-media-20160705/)
-   [Encrypted media extensions wikipedia](https://en.wikipedia.org/wiki/Encrypted_Media_Extensions)
-   [Encrypted media extensions on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Encrypted_Media_Extensions_API)
-   [Intro to encrypted media extensions](https://www.html5rocks.com/en/tutorials/eme/basics/)

### dash.js

-   [dash if forum](https://dashif.org/)
-   [dash.js wiki](https://github.com/Dash-Industry-Forum/dash.js/wiki)
-   [dash.js](https://github.com/Dash-Industry-Forum/dash.js)
-   [dash.js releases](https://github.com/Dash-Industry-Forum/dash.js/releases)

### Build tools

-   [npm](https://www.npmjs.com/)
-   [grunt](https://gruntjs.com/)
