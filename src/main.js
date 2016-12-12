const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Logger = require('./util/logger.js');
const settings = require('./util/settings.js');
const fs = require('fs');
const ipcMain = electron.ipcMain;
const Menu = electron.Menu;
var testMode = false;
const ModuleName = "MAIN_MODULE"

Logger.info("Starting application", ModuleName);
init();


function init() {
    var arguments = process.argv.slice(2);
    arguments.forEach(function (val, index, array) {
        if (val == 'runTests') {
            testMode = true;
            Logger.info('Start running tests!', ModuleName);
        }
    });

    Logger.info("Loading Settings File", ModuleName);
    try {
        settings.reload();
        Logger.info("Existing Settings File Loaded", ModuleName);
    } catch (e) {
        settings.init();
        Logger.info("New Settings File Created", ModuleName);
    }

    if (settings.get("STANDARD_FILE_PATH") === undefined) {
        if (process.platform == 'darwin') {
            settings.set("STANDARD_FILE_PATH", app.getPath('home') + '/Documents/NoteDown');
        } else if (process.platform = 'win32') {
            settings.set("STANDARD_FILE_PATH", app.getPath('home') + '\\Documents\\NoteDown');
        }
    }

    if (testMode === true) {
        Logger.info("start testing", ModuleName);
        app.on('ready', function () {
            var mainWindow = new BrowserWindow({
                width: 1200,
                height: 800
            });
            mainWindow.loadURL(`file://${__dirname}/../test/index.html`);
        });
    } else {
        app.once('ready', function () {
            const menuTemplate = require('./components/menu-template.js');

            var template = menuTemplate.template;

            if (process.platform == 'darwin') {
                template.unshift(menuTemplate.appleTemplate);
                // Window menu.
                template[3].submenu.push(menuTemplate.appleWindowTemplate);
            }

            var menu = Menu.buildFromTemplate(template);
            Menu.setApplicationMenu(menu);
        });

        app.on('ready', function () {
            var mainWindow = new BrowserWindow({
                width: 1200,
                height: 800
            });
            mainWindow.loadURL(`file://${__dirname}/index.html`);
        });
    }
}


ipcMain.on('setCurrentFile', function (event, arg) {
    settings.set('CURRENT_FILE', arg);
    event.returnValue = 'saved';
});

ipcMain.on('setCurrentContent', function (event, arg) {
    settings.set('CURRENT_CONTENT', arg);
    event.returnValue = 'saved';
});

ipcMain.on('getStandardFilePath', function (event, arg) {
    event.returnValue = settings.get("STANDARD_FILE_PATH");
});
