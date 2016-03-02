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
    }
});