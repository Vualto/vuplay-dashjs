function OverrideKeySystemWidevine() {
    return {
        getInitData: function (cpData, kid) {
            this.kid = kid;
            if ('pssh' in cpData) {
                return BASE64.decodeArray(cpData.pssh.__text).buffer;
            }
            return null;
        },

        getLicenseRequestFromMessage: function (message) {
            var body = {
                'token': OverrideKeySystemWidevine.VUDRM_TOKEN,
                'drm_info': Array.apply(null, new Uint8Array(message)),
                'kid': this.kid
            };
            body = JSON.stringify(body);
            return body;
        }
    }
};

//VUALTO need a better way of setting this! 
//At the moment we are limited by this: https://github.com/Dash-Industry-Forum/dash.js/issues/1162
OverrideKeySystemWidevine.VUDRM_TOKEN = null;
