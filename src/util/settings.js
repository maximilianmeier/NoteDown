var fs = require('fs');
var electron = require('electron');
var Constants = require('./constants');
var app = electron.app;
if(!app) {
    app = electron.remote.app;
}
var Logger = require('../util/logger');
const moduleName = "SettingsFile";

/**
 * Handles setting value interactions of the application.
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */
module.exports = {
    settingsFilePath: app.getAppPath() + '/' + Constants.SETTINGS_FILE_NAME,
    settings: {},

    /**
     * Gets the current value of the key inside the settings.
     *
     * @param key Key for the Value
     * @returns value The resulting value.
     * @since 0.1.0
     * @author Maximilian Meier
     */
    get: function (key) {
        return this.settings[key]
    },

    /**
     * Sets new value of the key inside the settings.
     *
     * @param key Key for the Value
     * @returns value New value.
     * @since 0.1.0
     * @author Maximilian Meier
     */
    set: function (key, val) {
        this.settings[key] = val;
        fs.writeFileSync(this.settingsFilePath, JSON.stringify(this.settings), 'utf-8');
        Logger.info("Setting File was updated. Property: " + key, moduleName);
        return val;
    },

    /**
     * Initializes new settings. Should just be called by first time execution of the application!
     *
     * @since 0.1.0
     * @author Maximilian Meier
     */
    init: function () {
        this.settings = {};
        this.settingsFilePath = app.getAppPath() + '/' + Constants.SETTINGS_FILE_NAME;
    },

    /**
     * Loads existing settings from the storage.
     *
     * @since 0.1.0
     * @author Maximilian Meier
     */
    reload: function () {
        this.settingsFilePath = app.getAppPath() + '/' + Constants.SETTINGS_FILE_NAME;
        this.settings = JSON.parse(fs.readFileSync(this.settingsFilePath, 'utf-8'));
    }
}

