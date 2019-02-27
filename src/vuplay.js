(function() {
    // Set your mpeg-DASH url here.
    var url = "<your-stream-url>";

    // Please login to https://admin.drm.technology to generate a vudrm token.
    var vudrmToken = "<your-vudrm-token>";

    // Override two dash.js methods so that we can set the widevine license request body.
    var overrideKeySystemWidevine = function() {
        return {
            getInitData: function(cpData, kid) {
                this.kid = kid;
                if ("pssh" in cpData) {
                    return BASE64.decodeArray(cpData.pssh.__text).buffer;
                }
                return null;
            },

            getLicenseRequestFromMessage: function(message) {
                var body = {
                    token: vudrmToken,
                    drm_info: Array.apply(null, new Uint8Array(message)),
                    kid: this.kid,
                };
                body = JSON.stringify(body);
                return body;
            },
        };
    };

    var overrideProtectionKeyController = function() {
        var parent = this.parent;

        return {
            getSupportedKeySystemsFromContentProtection: function(cps) {
                var cp, ks, ksIdx, cpIdx;
                var supportedKS = [];
                var keySystems = parent.getKeySystems();
                var cpsWithKeyId = cps.find(function(element) {
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

    // Initialize dashjs.
    var player = dashjs.MediaPlayer().create();
    player.extend("KeySystemWidevine", overrideKeySystemWidevine, true);
    player.extend(
        "ProtectionKeyController",
        overrideProtectionKeyController,
        true,
    );
    player.initialize();
    player.attachView(document.querySelector("#vuplay-video"));
    player.attachTTMLRenderingDiv(
        document.querySelector("#ttml-rendering-div"),
    );
    player.attachVideoContainer(document.querySelector("#vuplay-container"));
    player.setAutoPlay(true);

    // For PlayReady the vudrm token is attached as a querystring parameter on the license server url.
    var playReadyLaUrl =
        "https://playready-license.drm.technology/rightsmanager.asmx?token=" +
        encodeURIComponent(vudrmToken);
    // For widevine set the LaUrl and the vudrm token.
    var widevineLaUrl = "https://widevine-proxy.drm.technology/proxy";

    // Set the protection data. dashjs only supports PlayReady and Widevine but Vualto do support!
    player.setProtectionData({
        "com.widevine.alpha": {
            serverURL: widevineLaUrl,
            httpRequestHeaders: {},
        },
        "com.microsoft.playready": {
            serverURL: playReadyLaUrl,
            httpRequestHeaders: {},
        },
    });

    // Set the player's source.
    player.attachSource(url);
})();
