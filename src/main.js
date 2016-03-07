const electron = require('electron');
const app = require('app');
const BrowserWindow = require('browser-window');
const myApp = require('./app.js');
const Logger = require('./util/logger.js');
const fileManager = require('./file-manager.js');
const Constants = require('./util/constants.js');
const fs = require('fs');
const ipcMain = require('electron').ipcMain;
const Menu = electron.Menu;
var testMode = false;

var arguments = process.argv.slice(2);
arguments.forEach(function(val, index, array) {
  if (val == 'runTests') {
    testMode = true;
    Logger.info('Start running tests!');
  }
});

try {
  var settingsFile = JSON.parse(fs.readFileSync(app.getAppPath() + '/settings.json', 'utf-8'));
  global.basicSettings = settingsFile;
  updateSettings();
} catch (e) {
  var basicSettings = {
  };
  fs.writeFileSync(app.getAppPath() + '/settings.json', JSON.stringify(basicSettings), 'utf-8');
  global.settingsFile = basicSettings;
  updateSettings();
}

console.log(app.getPath('home'));

if (process.platform == 'darwin') {
  global.settingsFile.STANDARD_FILE_PATH = app.getPath('home') + '/Documents/NoteDown';
  //Constants.defineGlobal("STANDARD_FILE_PATH","/Users/MaxiMac/Documents/NoteDown/");
} else if (process.platform = 'win32') {
  global.settingsFile.STANDARD_FILE_PATH = app.getPath('home') + '\\Documents\\NoteDown';
}

if (testMode === true) {
  Logger.info("start testing");
  app.on('ready', function() {
    var mainWindow = new BrowserWindow({
      width: 800,
      height: 600
    });
    mainWindow.loadURL('file://' + __dirname + '/../test/index.html');
  });
} else {
  app.once('ready', function() {


    var template = [{
      label: 'Notes',
      submenu: [{
        label: 'New Note',
        accelerator: 'CmdOrCtrl+N',
        click: function(item, focusedWindow) {
          Logger.info('Want to create a new Note!');
          fileManager.createNewMarkdownFile("test");
        }
      }, {
        label: 'New Notebook',
        accelerator: 'Shift+CmdOrCtrl+N',
        click: function(item, focusedWindow) {
          Logger.info('Want to create a new Notebook!');
          Logger.error('NYI!');
        }
      }, {
        label: 'Save Note',
        accelerator: 'CmdOrCtrl+S',
        click: function(item, focusedWindow) {
          Logger.info('Want to create a new Notebook!');
          fileManager.saveMarkdownFile();
        }
      }, {
        label: 'Save Note As',
        accelerator: 'Shift+CmdOrCtrl+S',
        click: function(item, focusedWindow) {
          Logger.info('Want to create a new Notebook!');
          Logger.error('NYI!');
        }
      }]
    }, {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      }, {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      }, {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      }, {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      }, {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      }, ]
    }, {
      label: 'View',
      submenu: [{
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.reload();
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Ctrl+Command+F';
          else
            return 'F11';
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Alt+Command+I';
          else
            return 'Ctrl+Shift+I';
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.toggleDevTools();
        }
      }, ]
    }, {
      label: 'Window',
      role: 'window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      }, {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }, ]
    }, {
      label: 'Help',
      role: 'help',
      submenu: [{
        label: 'Learn More',
        click: function() {
          require('electron').shell.openExternal('http://electron.atom.io')
        }
      }, ]
    }, ];

    if (process.platform == 'darwin') {
      var name = require('electron').app.getName();
      template.unshift({
        label: name,
        submenu: [{
          label: 'About ' + name,
          role: 'about'
        }, {
          type: 'separator'
        }, {
          label: 'Services',
          role: 'services',
          submenu: []
        }, {
          type: 'separator'
        }, {
          label: 'Hide ' + name,
          accelerator: 'Command+H',
          role: 'hide'
        }, {
          label: 'Hide Others',
          accelerator: 'Command+Alt+H',
          role: 'hideothers'
        }, {
          label: 'Show All',
          role: 'unhide'
        }, {
          type: 'separator'
        }, {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function() {
            app.quit();
          }
        }, ]
      });
      // Window menu.
      template[3].submenu.push({
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        role: 'front'
      });
    }

    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  });

  app.on('ready', function() {
    var mainWindow = new BrowserWindow({
      width: 800,
      height: 600
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
  });
}

function updateSettings() {
    Object.observe(global.settingsFile, function (changes) {
        fs.writeFile(app.getAppPath() + "/settings.json", JSON.stringify(global.settingsFile), "utf-8", function (error) {
            if (error) {
                throw error;
            }


        });
    });

    for (key in global.settingsFile) {
        if (typeof global.settingsFile[key] === "object") {

            Object.observe(global.settingsFile[key], function (changes) {
                fs.writeFile(app.getAppPath() + "/settings.json", JSON.stringify(global.settingsFile), "utf-8", function (error) {
                    if (error) {
                        throw error;
                    }


                });
            });
        }

    }
};

ipcMain.on('setCurrentFile', function(event, arg) {
  global.settingsFile.CURRENT_FILE = arg;
  event.returnValue = 'saved';
});

ipcMain.on('setCurrentContent', function(event, arg) {
  global.CURRENT_CONTENT = arg;
  event.returnValue = 'saved';
});
