var settings = require('./settings');
var isSettingsShown = false;
var TemplateLoader = require('./util/template-loader');
var $ = require('jquery');
var { ipcRenderer } = require('electron');

ipcRenderer.on('window:open:settings', () => {
    _startupSettings();
});

/**
 * Initialized settings window.
 *
 * @param focusedWindow Current focused window in which the window is displayed
 * @since 0.1.0
 * @author Maximilian Meier
 */
function _startupSettings(focusedWindow) {
    if (!isSettingsShown) {
        var code = TemplateLoader.loadTemplate('settings-panel');
        $(".hoverSpace").html(code);
        settings.startUpSettingsPage();
        isSettingsShown = true;
    } else {
        $(".hoverSpace").html("");
        settings.tearDownSettingsPage();
        isSettingsShown = false;
    }

}
