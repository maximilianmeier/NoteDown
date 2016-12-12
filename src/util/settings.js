var fs = require('fs');
var electron = require('electron');
var Constants = require('./constants');
var app = electron.app;
var Logger = require('../util/logger');
const moduleName = "SettingsFile"
module.exports = {
    settingsFilePath: app.getAppPath() + '/' + Constants.SETTINGS_FILE_NAME,
    settings: {},

    get: function (key) {
        return this.settings[key]
    },

    set: function (key, val) {
        this.settings[key] = val;
        fs.writeFileSync(this.settingsFilePath, JSON.stringify(this.settings), 'utf-8');
        Logger.info("Setting File was updated. Property: " + key, moduleName);
        return val;
    },
    init: function () {
        this.settings = {};
        this.settingsFilePath = app.getAppPath() + '/' + Constants.SETTINGS_FILE_NAME;
    },
    reload: function () {
        this.settings = JSON.parse(fs.readFileSync(app.getAppPath() + '/' + Constants.SETTINGS_FILE_NAME, 'utf-8'));
        this.settingsFilePath = app.getAppPath() + '/' + Constants.SETTINGS_FILE_NAME;
    }
}

