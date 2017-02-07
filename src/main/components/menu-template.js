const electron = require('electron');
const app = electron.app;
const Logger = require('../../util/logger');
const MainWindow = require('../../main-window');


/**
 * General menu template of the application
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */
exports.template = [{
    label: 'Notes',
    submenu: [{
        label: 'New Note',
        accelerator: 'CmdOrCtrl+N',
        click: function (item, focusedWindow) {
            Logger.info('Creating a new Note!');
            MainWindow.webContents.send('note:new');
        }
    }, {
        label: 'New Notebook',
        accelerator: 'Shift+CmdOrCtrl+N',
        click: function (item, focusedWindow) {
            Logger.info('Creating a new Notebook!');
            Logger.error('NYI!');
        }
    }, {
        label: 'Save Note',
        accelerator: 'CmdOrCtrl+S',
        click: function (item, focusedWindow) {
            Logger.info('Saving a Note!');
            MainWindow.webContents.send('note:save');
        }
    }, {
        label: 'Save Note As',
        accelerator: 'Shift+CmdOrCtrl+S',
        click: function (item, focusedWindow) {
            Logger.info('Saving Note as ...!');
            Logger.error('NYI!');
        }
    }, {
        label: 'Close Note',
        accelerator: 'CmdOrCtrl+W',
        click: function (item, focusedWindow) {
            Logger.info('Closing current Note!');
            MainWindow.webContents.send('note:close');
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

/**
 * MacOS specific menu template to add the extra menu item
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */
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
            MainWindow.webContents.send('window:open:settings');
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

/**
 * Additional macOS window menu item.
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */
exports.appleWindowTemplate = {
    type: 'separator'
}, {
    label: 'Bring All to Front',
    role: 'front'
};