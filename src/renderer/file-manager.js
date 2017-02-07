var fileUtil = require('./../util/file-util');
var dialog = require('electron').remote.dialog;
var Logger = require('./../util/logger');
var { ipcRenderer } = require('electron');
var fs = require('fs');
var settings = require('./../util/settings');
settings.reload();

ipcRenderer.on('note:new', () => {
    console.log('new!!');
   _createNewMarkdownFile();
});

ipcRenderer.on('note:save', () => {
    _saveMarkdownFile();
});

/**
 * Handles interactions with the files.
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */

/**
 * Create a new markdown file.
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */
function _createNewMarkdownFile() {
    dialog.showSaveDialog({
        title: 'Create new file',
        defaultPath: settings.get('STANDARD_FILE_PATH'),
        filters: [{
            name: 'MarkDown',
            extensions: ['md']
        }]
    }, function (fileName) {
        if (fileName === undefined) {
            Logger.error("Filename is undefined!");
            return;
        }
        fileUtil.createNewFile(fileName);
    });
};

/**
 * Saves current file. The necessary information are stored in the settings.
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */
function _saveMarkdownFile() {
    var currentFile = settings.get("CURRENT_FILE");
    var currentContent = settings.get("CURRENT_CONTENT");
    fs.writeFileSync(currentFile, currentContent, 'utf-8');
};
