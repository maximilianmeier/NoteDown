var fs = require('fs');
var Logger = require('./util/logger');
var fileUtil = require('./util/file-util');
var Editor = require('./editor');
var ipcRenderer = require('electron').ipcRenderer;
var $ = require('jquery');
const ModuleName = "DirectoryModule";
const filePath = ipcRenderer.sendSync('getStandardFilePath', "");

/**
 * Directory module is responsible for displaying the current file List in the UI and handles the click interactions for opening a new File.
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */



fs.readdir(filePath, (error, files) => {
    _updateFileList(files);
});

fs.watch(filePath, (event, filename) => {
    fs.readdir(filePath, (error, files) => {
        _updateFileList(files);
    });
});

$(document).ready(function () {
    $(".fileList").on('click', ".fileContainer", function (event) {
        var fileName = $(this).attr('id');
        Logger.info("Opening File: " + fileName, ModuleName);
        var file = fileUtil.openFile(ipcRenderer.sendSync('getStandardFilePath', "") + '/' + fileName);
        Editor.openFile(file);
        ipcRenderer.sendSync('setCurrentContent', file);
        ipcRenderer.sendSync('setCurrentFile', ipcRenderer.sendSync('getStandardFilePath', "") + '/' + fileName);
    });
});

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
    var htmlToAppend = "";
    files.forEach(function (file, index, array) {
        var stats = fs.statSync(filePath + "/" + file);
        htmlToAppend += "<div id='" + file + "' class='fileContainer'>"
        htmlToAppend += "<div class='fileElement'>" + file + "</div>";
        htmlToAppend += "<div class='fileDescription'>" + stats.size +" B | " + stats.mtime.toLocaleDateString() + "</div>";
        htmlToAppend += "</div>";
    });
    $(".fileList").html(htmlToAppend);
}
