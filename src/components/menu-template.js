const electron = require('electron');
const Menu = electron.Menu;
const Logger = require('../util/logger.js');
const fileManager = require('../file-manager.js');
const editor = require('../editor.js');
exports.template = [{
    label: 'Notes',
    submenu: [{
        label: 'New Note',
        accelerator: 'CmdOrCtrl+N',
        click: function (item, focusedWindow) {
            Logger.info('Want to create a new Note!');
            fileManager.createNewMarkdownFile("test");
        }
    }, {
        label: 'New Notebook',
        accelerator: 'Shift+CmdOrCtrl+N',
        click: function (item, focusedWindow) {
            Logger.info('Want to create a new Notebook!');
            Logger.error('NYI!');
        }
    }, {
        label: 'Save Note',
        accelerator: 'CmdOrCtrl+S',
        click: function (item, focusedWindow) {
            Logger.info('Want to save a Notebook!');
            fileManager.saveMarkdownFile();
        }
    }, {
        label: 'Save Note As',
        accelerator: 'Shift+CmdOrCtrl+S',
        click: function (item, focusedWindow) {
            Logger.info('Want to save a Notebook as ...!');
            Logger.error('NYI!');
        }
    }, {
        label: 'Close Note',
        accelerator: 'CmdOrCtrl+W',
        click: function (item, focusedWindow) {
            Logger.info('Want to close the Note!');
            editor.closeFileMainProcess(focusedWindow);
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
    },]
}, {
    label: 'View',
    submenu: [{
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
            if (focusedWindow)
                focusedWindow.reload();
        }
    }, {
        label: 'Toggle Full Screen',
        accelerator: (function () {
            if (process.platform == 'darwin')
                return 'Ctrl+Command+F';
            else
                return 'F11';
        })(),
        click: function (item, focusedWindow) {
            if (focusedWindow)
                focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
    }, {
        label: 'Toggle Developer Tools',
        accelerator: (function () {
            if (process.platform == 'darwin')
                return 'Alt+Command+I';
            else
                return 'Ctrl+Shift+I';
        })(),
        click: function (item, focusedWindow) {
            if (focusedWindow)
                focusedWindow.toggleDevTools();
        }
    },]
}, {
    label: 'Window',
    role: 'window',
    submenu: [{
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
    }, {
        label: 'Close',
        accelerator: '',
        role: 'close'
    }, /* {
     if (process.platform = 'win32') {
     label: 'settings',
     accelerator: 'CmdOrCtrl+,',
     click: function() {
     Logger.info("Opening Settings!");
     Logger.info("NYI");
     }
     }
     },*/]
}, {
    label: 'Help',
    role: 'help',
    submenu: [{
        label: 'Learn More',
        click: function () {
            require('electron').shell.openExternal('http://electron.atom.io')
        }
    },]
},];

exports.appleTemplate = {
    label: electron.app.getName(),
    submenu: [{
        label: 'About ' + electron.app.getName(),
        role: 'about'
    }, {
        type: 'separator'
    }, {
        label: 'Settings',
        accelerator: 'CmdOrCtrl+,',
        click: function (item, focusedWindow) {
            Logger.info("Opening settings!");
            uiManager.startupSettings(focusedWindow);
            Logger.info("NOT YET COMPLETEY IMPLEMENTED");
        }
    }, {
        label: 'Services',
        role: 'services',
        submenu: []
    }, {
        type: 'separator'
    }, {
        label: 'Hide ' + electron.app.getName(),
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
        click: function () {
            app.quit();
        }
    },]
};

exports.appleWindowTemplate = {
    type: 'separator'
}, {
    label: 'Bring All to Front',
    role: 'front'
};