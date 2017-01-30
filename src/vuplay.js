(function () {
    var url = "http://dash.edgesuite.net/envivio/EnvivioDash3/manifest.mpd";
    var player = dashjs.MediaPlayer().create();
    player.initialize(document.querySelector("#vuplay-video"), url, true);
})();