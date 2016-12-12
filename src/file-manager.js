var fileUtil = require('./util/file-util');
var dialog = require('electron').dialog;
var Logger = require('./util/logger');
var settings = require('./util/settings');
var fs = require('fs');

exports.createNewMarkdownFile = function () {
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

exports.saveMarkdownFile = function () {
    var currentFile = settings.get("CURRENT_FILE");
    var currentContent = settings.get("CURRENT_CONTENT");
    fs.writeFileSync(currentFile, currentContent, 'utf-8');
};
