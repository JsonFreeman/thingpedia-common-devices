const Tp = require('thingpedia');

module.exports = new Tp.DeviceClass({
    Name: 'OneDriveDevice',
    Extends: Tp.OnlineAccount,

    _init: function(engine, state) {
        this.parent(engine, state);

        this.globalName = 'onedrive';
        this.uniqueId = 'com.onedrive-' + this.profileId;
        this.name = "OneDrive Account %s".format(this.profileId);
        this.description = "This is your OneDrive Account.";
    },

    get profileId() {
        return this.state.profileId;
    },

    get accessToken() {
        return this.state.accessToken;
    },

    queryInterface: function(iface) {
        switch (iface) {
            case 'oauth2':
                return this;
            default:
                return null;
        }
    },

    refreshCredentials: function() {
        // FINISHME refresh the access token using the refresh token
    },
});