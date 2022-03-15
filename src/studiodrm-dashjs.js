(function () {
    // Set your mpeg-DASH URL here.
    var streamURL = "<your-stream-url>";
    // TODO: Change the below to the JW Studio DRM docs 
    // Please login to https://admin.drm.technology to generate a Studio DRM token.
    var studioDrmToken = "<your-studiodrm-token>";

    // Override two dash.js methods so that we can set the Widevine license request body.
    var overrideKeySystemWidevine = function () {
        return {
            getInitData: function (cpData, kid) {
                this.kid = kid;
                if ("pssh" in cpData) {
                    return BASE64.decodeArray(cpData.pssh.__text).buffer;
                }
                return null;
            },

            getLicenseRequestFromMessage: function (message) {
                var body = {
                    token: studioDrmToken,
                    drm_info: Array.apply(null, new Uint8Array(message)),
                    kid: this.kid,
                };
                body = JSON.stringify(body);
                return body;
            },
        };
    };

    var overrideProtectionKeyController = function () {
        var parent = this.parent;

        return {
            getSupportedKeySystemsFromContentProtection: function (cps) {
                if (typeof cps === "undefined" || cps === null) return;
                var cp, ks, ksIdx, cpIdx;
                var supportedKS = [];
                var keySystems = parent.getKeySystems();
                var cpsWithKeyId = cps.find(function (element) {
                    return element.KID !== null;
                });

                if (cps) {
                    for (ksIdx = 0; ksIdx < keySystems.length; ++ksIdx) {
                        ks = keySystems[ksIdx];
                        for (cpIdx = 0; cpIdx < cps.length; ++cpIdx) {
                            cp = cps[cpIdx];
                            if (
                                cp.schemeIdUri.toLowerCase() === ks.schemeIdURI
                            ) {
                                // Look for DRM-specific ContentProtection
                                var initData = ks.getInitData(
                                    cp,
                                    cpsWithKeyId.KID,
                                );
                                if (initData) {
                                    supportedKS.push({
                                        ks: keySystems[ksIdx],
                                        initData: initData,
                                    });
                                }
                            }
                        }
                    }
                }
                return supportedKS;
            },
        };
    };

    // Initialize dash.js.
    var player = dashjs.MediaPlayer().create();
    player.extend("KeySystemWidevine", overrideKeySystemWidevine, true);
    player.extend(
        "ProtectionKeyController",
        overrideProtectionKeyController,
        true,
    );
    player.initialize(document.querySelector("#vuplay-video"), streamURL, true);
    player.attachTTMLRenderingDiv(
        document.querySelector("#ttml-rendering-div"),
    );

    // For PlayReady the VUDRM token is attached as a querystring parameter on the license server URL.
    var playReadyLaUrl =
        "https://playready-license.drm.technology/rightsmanager.asmx";
    // For Widevine set the LaURL and the VUDRM token.
    var widevineLaUrl = "https://widevine-proxy.drm.technology/proxy";

    // TODO: Change lines 97, 103 with the new header name... X-STUDIODRM-TOKEN?
    // Set the protection data. dash.js only supports PlayReady and Widevine but JW Player do support!
    player.setProtectionData({
        "com.widevine.alpha": {
            serverURL: widevineLaUrl,
            httpRequestHeaders: {
                "X-VUDRM-TOKEN": studioDrmToken
            },
        },
        "com.microsoft.playready": {
            serverURL: playReadyLaUrl,
            httpRequestHeaders: {
                "X-VUDRM-TOKEN": studioDrmToken
            },
        },
    });
})();
