OverrideKeySystemWidevine = function () {
    var context = this.context;
    var parent = this.parent;
    var keyId = null;

    return {
        getInitData: function (cpData, kid) {
            this.kid = kid;
            if ('pssh' in cpData) {
                return BASE64.decodeArray(cpData.pssh.__text).buffer;
            }
            return null;
        },

        getLicenseRequestFromMessage: function (message) {
            body = {
                'token': "vudrm-token",
                'drm_info': Array.apply(null, new Uint8Array(message)),
                'kid': this.kid
            };
            body = JSON.stringify(body);
            return body;
        },

        getLicenseServer: function (keySystem, protData, messageType) {

            // Our default server implementations do not do anything with "license-release" or
            // "individualization-request" messages, so we just send a success event
            if (messageType === 'license-release' || messageType === 'individualization-request') {
                return null;
            }

            var licenseServerData = null;
            if (protData && protData.hasOwnProperty('drmtoday')) {
                licenseServerData = DRMToday(context).getInstance();
            } else if (keySystem.systemString === 'com.widevine.alpha') {
                licenseServerData = Widevine(context).getInstance();
            } else if (keySystem.systemString === 'com.microsoft.playready') {
                licenseServerData = PlayReady(context).getInstance();
            } else if (keySystem.systemString === 'org.w3.clearkey') {
                licenseServerData = ClearKey(context).getInstance();
            }

            return licenseServerData;
        }
    }
};