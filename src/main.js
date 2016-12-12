const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Logger = require('./util/logger');
const settings = require('./util/settings');
const fs = require('fs');
const ipcMain = electron.ipcMain;
const Menu = electron.Menu;
const Constants = require('./util/constants');
var testMode = false;
const ModuleName = "MAIN_MODULE"

Logger.info("Starting application. Version: " + Constants.VERSION_NUMBER, ModuleName);
init();


function init() {
    testMode = checkForTestMode();

    loadSettings();

    if (testMode === true) {
        startTestMode();
    } else {
        startApplication();
    }
}

function checkForTestMode() {
    var testMode = false;
    var arguments = process.argv.slice(2);
    arguments.forEach(function (val, index, array) {
        if (val == 'runTests') {
            testMode = true;
            Logger.info('Start running tests!', ModuleName);
        }
    });
    return testMode;
}

function loadSettings() {
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
}

function startTestMode() {
    Logger.info("start testing", ModuleName);
    app.on('ready', function () {
        var mainWindow = new BrowserWindow({
            width: Constants.STANDARD_WIDTH,
            height: Constants.STANDARD_HEIGHT
        });
        mainWindow.loadURL(`file://${__dirname}/../test/index.html`);
    });
}

function startApplication() {
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
            width: Constants.STANDARD_WIDTH,
            height: Constants.STANDARD_HEIGHT
        });
        mainWindow.loadURL(`file://${__dirname}/index.html`);
    });
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
