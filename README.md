# vuplay dashjs

## Description

This repo will demonstrate how to use [vudrm](http://vudrm.vualto.com/) with the [dash.js](https://github.com/Dash-Industry-Forum/dash.js/wiki).
If you have any questions please contact support@vualto.com

This repo is currently targeted at [version 2.6.0](https://github.com/Dash-Industry-Forum/dash.js/releases/tag/v2.6.0) of dash.js.

## Instructions

### Install dependencies

1. Install [npm](https://www.npmjs.com/)
2. Install the [grunt-cli](https://www.npmjs.com/package/grunt-cli): `npm install -g grunt-cli`
3. Clone the repo: `git clone git@github.com:Vualto/vuplay-dashjs.git`
4. Navigate to the project's root folder: `cd vuplay-dashjs`
5. Install the dependencies: `npm install`

### Build and run the dev environment

1. Open the repo in your favourite javascript editor.
2. In file `src/vuplay.js` replace `<your-stream-url>` with your stream url. This must be a [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP) stream.
3. In file `src/vuplay.js` replace `<your-vudrm-token>` with a vudrm token from [https://admin.drm.technology](https://admin.drm.technology)
4. Run `grunt build` in the project's root. This will create a `dist` folder that contains all the files need to run this demo.
5. Run `grunt serve`, this will run the build task from the previous step and start a development node.js server. This server is not suitable for production.
    - You will need to add the host `dashjs.vuplay.local.drm.technology` to your local machine's hosts file in order for this to work.
6. Load a supported browser and go to `https://dashjs.vuplay.local.drm.technology:14703`
     
NB: In order to allow DRM encrypted playback in chrome (https://goo.gl/EEhZqT), SSL has been enabled for the demo. You will get a warning about an invalid cert `NET::ERR_CERT_AUTHORITY_INVALID` but this can safely be ignored.

### Browser support

The browser must support [encrypted media extensions](https://www.w3.org/TR/2016/CR-encrypted-media-20160705/).
Currently this includes the latest versions of Chrome, Firefox, Internet Explorer 11 and Edge.
For a complete breakdown of supported media extensions please contact support@vualto.com

## Useful links

### vudrm

- [Contact vualto](http://www.vualto.com/contact-us/)
- [vudrm](http://vudrm.vualto.com/)
- [vudrm token documentation](http://readme.drm.technology/vudrm/VuDrmTokenIntegration/)

### mpeg-DASH

- [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP)
- [What is MPEG-DASH](http://www.streamingmedia.com/Articles/Editorial/What-Is-.../What-is-MPEG-DASH-79041.aspx)

### Encrpyted media extensions

- [Encrypted media extensions specification](https://www.w3.org/TR/2016/CR-encrypted-media-20160705/)
- [Encrypted media extensions wikipedia](https://en.wikipedia.org/wiki/Encrypted_Media_Extensions)
- [Encrypted media extensions on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Encrypted_Media_Extensions_API)
- [Intro to encrypted media extensions](https://www.html5rocks.com/en/tutorials/eme/basics/)

### dash.js

- [dash if forum](http://dashif.org/)
- [dash.js wiki](https://github.com/Dash-Industry-Forum/dash.js/wiki)
- [dash.js](https://github.com/Dash-Industry-Forum/dash.js)
- [dash.js releases](https://github.com/Dash-Industry-Forum/dash.js/releases)

### Build tools

- [npm](https://www.npmjs.com/)
- [grunt](http://gruntjs.com/)
