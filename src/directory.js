var fs = require('fs');
var Logger = require('./util/logger');
var fileUtil = require('./util/file-util');
var Editor = require('./editor');
var settings = require('./util/settings');
var $ = require('jquery');
const ModuleName = "DirectoryModule";
var TemplateLoader = require('./util/template-loader');
var settings = require('./util/settings');
settings.reload();
const filePath = settings.get('STANDARD_FILE_PATH');

/**
 * Directory module is responsible for displaying the current file List in the UI and handles the click interactions for opening a new File.
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */

fs.watch(filePath, (event, filename) => {
    readAndUpdateFileList();
});

$(document).ready(function () {
    readAndUpdateFileList();
    $(".fileList").on('click', ".fileContainer", function (event) {
        var fileName = $(this).attr('id');
        Logger.info("Opening File: " + fileName, ModuleName);
        var file = fileUtil.openFile(settings.get('STANDARD_FILE_PATH') + '/' + fileName);
        Editor.openFile(file);
        settings.set('CURRENT_CONTENT', file);
        settings.set('CURRENT_FILE', settings.get('STANDARD_FILE_PATH') + '/' + fileName)
    });
});

function readAndUpdateFileList() {
    _updateFileList(fileUtil.openFileListWithStats(filePath));
}

/**
 *  Adds the new file list to the Interface.
 *
 * @param files List of current files.
 * @since 0.1.0
 * @author Maximilian Meier
 */
function _updateFileList(files) {
    if (files === undefined) {
        return;
    }
    var htmlCode = TemplateLoader.loadTemplate('directory-list', files);
    $(".fileList").html(htmlCode);
}
