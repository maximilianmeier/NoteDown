const electron = require('electron');
const app = require('app');
const BrowserWindow = require('browser-window');
const myApp = require('./app.js');
const Logger = require('./util/logger.js');
const fileManager = require('./file-manager.js');
const fs = require('fs');
const Menu = electron.Menu;
var testMode = false;

var arguments = process.argv.slice(2);
arguments.forEach(function(val, index, array) {
  if (val == 'runTests') {
    testMode = true;
    Logger.info('Start running tests!');
  }
});

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
