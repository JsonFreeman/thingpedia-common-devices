"use strict";
var Tp = require('thingpedia');

module.exports = new Tp.DeviceClass({
    Name: 'OneDriveDevice',
    Extends: Tp.OnlineAccount,
    UseOAuth2: Tp.Helpers.OAuth2({
        kind: 'edu.stanford.jasonf2_kkiningh.onedrive',
        client_id: "0000000040187E71",
        client_secret: "zBAvJlpqUOfY2lzvXYgsa-aHYKM1AC1h",
        authorize: "https://login.live.com/oauth20_authorize.srf",
        scope: ['wl.signin', 'wl.offline_access', 'onedrive.readwrite', 'onedrive.appfolder'],
        get_access_token: "https://login.live.com/oauth20_token.srf",
        callback: function(engine, accessToken, refreshToken) {
            var auth = 'Bearer ' + accessToken;
            return Tp.Helpers.Http.get('https://api.onedrive.com/v1.0/drive',
                                       { auth: auth,
                                         accept: 'application/json' })
            .then(function (response) {
                var parsed = JSON.parse(response);
                return engine.devices.loadOneDevice({ kind: 'edu.stanford.jasonf2_kkiningh.onedrive',
                                                      accessToken: accessToken,
                                                      refreshToken: refreshToken,
                                                      driveId: parsed.id });
            });
        }
    }),

    _init: function(engine, state) {
        this.parent(engine, state);

        this.globalName = 'onedrive';
        this.uniqueId = 'edu.stanford.jasonf2_kkiningh.onedrive';
        this.name = "OneDrive Account";
        this.description = "This is your OneDrive Account.";
    },

    get accessToken() {
        return this.state.accessToken;
    },

    get refreshToken() {
        return this.state.refreshToken;
    },

    get driveId() {
        return this.state.driveId;
    },

    // it's cloud backed so always available
    checkAvailable: function() {
        return Tp.Availability.AVAILABLE;
    },

    queryInterface: function(iface) {
        switch (iface) {
        case 'oauth2':
            return this;
            // fallthrough
        default:
            return null;
        }
    }
});