OverrideKeySystemWidevine = function () {
    var context = this.context;
    var parent = this.parent;
    
    return {
        getInitData: function (cp, keyId) {
            return CommonEncryption.parseInitDataFromContentProtection(cp);
        },

        getLicenseRequestFromMessage: function (message) {
            body = {
                'token': "vudrm-token",
                'drm_info': Array.apply(null, new Uint8Array(message)),
                'kid': "the-kid"
            };
            body = JSON.stringify(body);
            return body;
        }
    }
};