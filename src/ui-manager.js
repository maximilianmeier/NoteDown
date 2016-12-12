var settings = require('./settings');
var isSettingsShown = false;
exports.startupSettings = function(focusedWindow) {
  if(!isSettingsShown) {
    var code = "<div class=\"hoverContainer\"><div class=\"hoverSettings\"><h1>Settings:</h1></div></div>";
    focusedWindow.webContents.executeJavaScript("document.getElementsByClassName('hoverSpace')[0].innerHTML = '"+code+"';");
    settings.startUpSettingsPage();
    isSettingsShown = true;
  } else {
    focusedWindow.webContents.executeJavaScript("document.getElementsByClassName('hoverSpace')[0].innerHTML = ''");
    settings.tearDownSettingsPage();
    isSettingsShown = false;
  }

}
