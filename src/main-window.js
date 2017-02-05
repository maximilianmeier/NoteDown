const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const Constants = require('./util/constants');

let mainWindow = new BrowserWindow({
    'width': Constants.STANDARD_WIDTH,
    'height': Constants.STANDARD_HEIGHT,
    'minWidth': Constants.MIN_WIDTH,
    'minHeight': Constants.MIN_HEIGHT,
    'useContentSize': true
});

module.exports = mainWindow;