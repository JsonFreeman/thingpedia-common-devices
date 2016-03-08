const Tp = require('thingpedia');

module.exports = new Tp.ChannelClass({
    Name: 'OneDriveCreateFileAction',
    Extends: Tp.SimpleAction,

    _init: function(engine, device) {
        this.parent();
        this.device = device;
        this._baseurl = 'https://api.onedrive.com/v1.0/drive/root/children/';
    },

    get auth() {
        return "Bearer " + this.device.accessToken;
    },

    _doInvoke: function(fileName, newFilename) {
        var body = JSON.stringify({ name: newFilename });
        var url = this._baseurl + fileName;
        Tp.Helpers.Http.request(url, 'PATCH', body, {
            dataContentType: "text/plain",
            auth: this.auth
        }).done();
    }
});
