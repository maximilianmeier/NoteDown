var settings = require('./settings');
var isSettingsShown = false;
var TemplateLoader = require('./util/template-loader');

/**
 * Initialized settings window.
 *
 * @param focusedWindow Current focused window in which the window is displayed
 * @since 0.1.0
 * @author Maximilian Meier
 */
exports.startupSettings = function (focusedWindow) {
    if (!isSettingsShown) {
        var code = TemplateLoader.loadTemplate('settings-panel');
        focusedWindow.webContents.executeJavaScript("document.getElementsByClassName('hoverSpace')[0].innerHTML = '" + code + "';");
        settings.startUpSettingsPage();
        isSettingsShown = true;
    } else {
        focusedWindow.webContents.executeJavaScript("document.getElementsByClassName('hoverSpace')[0].innerHTML = ''");
        settings.tearDownSettingsPage();
        isSettingsShown = false;
    }

}
