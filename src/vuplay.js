(function () {
    // Set your mpeg-DASH url here.
    var url = "https://d1chyo78gdexn4.cloudfront.net/vualto-demo/vamps/vamps.ism/manifest.mpd";
    
    // Please login to https://admin.drm.technology to generate a vudrm token.
    var vudrmToken = "vualto-demo|2017-01-31T17:02:41Z|RAQrLiTYv+Z8U9LrxO0JDw==|1a7c3a4edb10d56003a5ae1df2ecce244b5fc2de";

    // Initialize dashjs.
    var player = dashjs.MediaPlayer().create();
    player.extend("KeySystemWidevine", OverrideKeySystemWidevine, true);
    player.extend("ProtectionKeyController", OverrideProtectionKeyController, true);
    player.initialize();
    player.attachView(document.querySelector("#vuplay-video"));
    player.attachVideoContainer(document.querySelector("#vuplay-container"));
    player.setAutoPlay(true);
    
    // For PlayReady the vudrm token is attached as a querystring parameter on the license server url.
    var playReadyLaUrl = "https://playready-license.drm.technology/rightsmanager.asmx?token=" + encodeURIComponent(vudrmToken);
    // For widevine set the LaUrl and the vudrm token.
    var widevineLaUrl = "https://widevine-proxy.drm.technology/proxy";
    OverrideKeySystemWidevine.VUDRM_TOKEN = vudrmToken;

    // Set the protection data. dashjs only supports PlayReady and Widevine but Vualto do support!
    player.setProtectionData({
        "com.widevine.alpha": {
            "serverURL": widevineLaUrl,
            "httpRequestHeaders": {}
        },
        "com.microsoft.playready": {
            "serverURL":  playReadyLaUrl,
            "httpRequestHeaders": {}
        }
    });

    // Set the player's source.
    player.attachSource(url);
})();