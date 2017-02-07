const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Logger = require('./../util/logger');
const settings = require('./../util/settings');
const fs = require('fs');
const Menu = electron.Menu;
const Constants = require('./../util/constants');
var testMode = false;
const ModuleName = "MAIN_MODULE";

/**
 * Main exection class of the application. All necesarry information for starting the app are prepared. Then the application is executed.
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */

_init();

/**
 * Initializes the app and starts the execution
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */
function _init() {
    Logger.info("Starting application. Version: " + Constants.VERSION_NUMBER, ModuleName);
    testMode = _checkForTestMode();

    _loadSettings();

    if (testMode === true) {
        _startTestMode();
    } else {
        _startApplication();
    }
}

/**
 * Checks for the test flag of the starting command.
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */
function _checkForTestMode() {
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

/**
 * Loads existing settings or initializes a new settings file.
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */
function _loadSettings() {
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

/**
 * Starts the execution of the test mode. Instead of the application the test window is shown.
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */
function _startTestMode() {
    Logger.info("start testing", ModuleName);
    app.on('ready', function () {
        var mainWindow = new BrowserWindow({
            width: Constants.STANDARD_WIDTH,
            height: Constants.STANDARD_HEIGHT
        });
        mainWindow.loadURL(`file://${__dirname}/../test/index.html`);
    });
}

/**
 * Starts the normal initialization of the application and loads the interface.
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */
function _startApplication() {
    app.once('ready', function () {
        const menuTemplate = require('./components/menu-template.js');

        var template = menuTemplate.template;

        if (process.platform == 'darwin') {
            template.unshift(menuTemplate.appleTemplate);
            template[3].submenu.push(menuTemplate.appleWindowTemplate);
        }

        var menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    });

    app.on('ready', function () {
        const MainWindow = require('./../main-window');
        MainWindow.loadURL(`file://${__dirname}/../index.html`);
    });
}