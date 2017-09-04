function OverrideProtectionKeyController() {
    var parent = this.parent;

    return {
        getSupportedKeySystemsFromContentProtection: function (cps) {
            var cp, ks, ksIdx, cpIdx;
            var supportedKS = [];
            var keySystems = parent.getKeySystems();
            var cpsWithKeyId = cps.find(function (element) {
                return element.KID !== null;
            });

            if (cps) {
                for (ksIdx = 0; ksIdx < keySystems.length; ++ksIdx) {
                    ks = keySystems[ksIdx];
                    for (cpIdx = 0; cpIdx < cps.length; ++cpIdx) {
                        cp = cps[cpIdx];
                        if (cp.schemeIdUri.toLowerCase() === ks.schemeIdURI) {

                            // Look for DRM-specific ContentProtection
                            var initData = ks.getInitData(cp, cpsWithKeyId.KID);
                            if (initData) {
                                supportedKS.push({
                                    ks: keySystems[ksIdx],
                                    initData: initData
                                });
                            }
                        }
                    }
                }
            }
            return supportedKS;
        }
    }
};
