const Tp = require('thingpedia');

module.exports = new Tp.DeviceClass({
    Name: 'OneDriveDevice',
    Extends: Tp.OnlineAccount,
    UseOAuth2: Tp.Helpers.OAuth2({
        kind: "com.onedrive",
        client_id: "0000000040187E71",
        client_secret: "zBAvJlpqUOfY2lzvXYgsa-aHYKM1AC1h",
        authorize: "https://login.live.com/oauth20_authorize.srf",
        scope: ['wl.signin', 'wl.offline_access', 'onedrive.readwrite', 'onedrive.appfolder']
        get_access_token: "https://login.live.com/oauth20_token.srf",
        callback: function(engine, accessToken, refreshToken) {
            return engine.devices.loadOneDevice({ kind: 'com.onedrive',
                                                  accessToken: accessToken,
                                                  refreshToken: refreshToken });
        }
    })

    _init: function(engine, state) {
        this.parent(engine, state);

        this.globalName = 'onedrive';
        this.uniqueId = 'com.onedrive-' + this.profileId;
        this.name = "OneDrive Account %s".format(this.profileId);
        this.description = "This is your OneDrive Account.";
    }

    get accessToken() {
        return this.state.accessToken;
    },

    get refreshToken() {
        return this.state.refreshToken;
    }
});