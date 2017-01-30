var OverrideKeySystemWidevine = function () {
    return {
        getLicenseRequestFromMessage: function (message) {
            return new Uint8Array(message);
        }
    }
};