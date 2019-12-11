// Override two dash.js methods so that we can set the Widevine license request body.
function VUDRMKeySystemWidevine(token) {
    /* We are currying the widevine method to pass the vudrm token  */
    return function() {
        return {
            getLicenseRequestFromMessage(message) {
                const body = {
                    token: token,
                    drm_info: Array.apply(null, new Uint8Array(message)),
                    kid: this.kid,
                };

                return JSON.stringify(body);
            },
        };
    };
}

function VUDRMProtectionKeyController() {
    const getSupportedKeySystemsFromContentProtection = this.parent
        .getSupportedKeySystemsFromContentProtection;
    const getKeySystems = this.parent.getKeySystems;

    const getSupportedKeySystemsFromContentProtectionParent = getSupportedKeySystemsFromContentProtection.bind(
        this.parent,
    );
    const getKeySystemsParent = getKeySystems.bind(this.parent);

    return {
        getSupportedKeySystemsFromContentProtection: function(
            contentProtections,
        ) {
            if (!contentProtections) {
                return [];
            }

            const contentProtection = contentProtections.find(function(cp) {
                return cp.KID !== null;
            });

            if (!contentProtection) {
                return [];
            }

            const KID = contentProtection.KID;
            const keySystems = getKeySystemsParent();

            keySystems.forEach(function(ks) {
                ks.kid = KID;
            });

            return getSupportedKeySystemsFromContentProtectionParent(
                contentProtections,
            );
        },
    };
}
