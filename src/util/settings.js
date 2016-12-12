var fs = require('fs');
var electron = require('electron');
var Constants = require('./constants.js');
var app = electron.app;
module.exports = {
    settingsFilePath: app.getAppPath() + '/' + Constants.SETTINGS_FILE_NAME,
    settings: {

    },

    get: function(key) {
        return this.settings[key]
    },

    set: function(key, val) {
        this.settings[key] = val;
        fs.writeFileSync(this.settingsFilePath, this.settings);
        return val;
    },
    init: function() {
        this.settings = {};
        this.settingsFilePath = app.getAppPath() + '/' + Constants.SETTINGS_FILE_NAME;
    },
    reload: function() {
        this.settings = JSON.parse(fs.readFileSync(app.getAppPath() + '/' + Constants.SETTINGS_FILE_NAME, 'utf-8'));
        this.settingsFilePath = app.getAppPath() + '/' + Constants.SETTINGS_FILE_NAME;
    }
}

