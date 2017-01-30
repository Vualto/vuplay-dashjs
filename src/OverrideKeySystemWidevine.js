OverrideKeySystemWidevine = function () {
    return {
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