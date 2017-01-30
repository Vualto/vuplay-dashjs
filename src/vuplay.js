(function () {
    // Set your mpeg-DASH url here.
    var url = "https://d1chyo78gdexn4.cloudfront.net/vualto-demo/vamps/vamps.ism/manifest.mpd";
    
    // Please login to https://admin.drm.technology to generate a vudrm token.
    var vudrmToken = "vualto-demo|2017-01-30T15:15:34Z|RAQrLiTYv+Z8U9LrxO0JDw==|dd36a579bf0cb9dca035bc3058e5015048136b63";

    // Initialize dashjs.
    var player = dashjs.MediaPlayer().create();
    player.initialize();
    player.attachView(document.querySelector("#vuplay-video"));
    player.attachVideoContainer(document.querySelector("#vuplay-container"));
    player.setAutoPlay(true);
    
    // For PlayReady the vudrm token is attached as a querystring parameter on the license server url.
    var playReadyLaUrl = "https://playready-license.drm.technology/rightsmanager.asmx?token=" + encodeURIComponent(vudrmToken);
    // For widevine TBC.
    var widevineLaUrl = "https://widevine.proxy.drm.technology/proxy";

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