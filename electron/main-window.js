const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

let mainWindow = new BrowserWindow({
  'width': 1200,
  'height': 800,
  'minWidth': 800,
  'minHeight': 600,
  'useContentSize': true
});

module.exports = mainWindow;
