var fs = require('fs');
var Logger = require('./util/logger');
var fileUtil = require('./util/file-util');
var Editor = require('./editor');
var ipcRenderer = require('electron').ipcRenderer;
var $ = require('jquery');
const ModuleName = "DirectoryModule";

/**
 * Directory module is responsible for displaying the current file List in the UI and handles the click interactions for opening a new File.
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */

fs.readdir(ipcRenderer.sendSync('getStandardFilePath', ""), (error, files) => {
    _updateFileList(files);
});

fs.watch(ipcRenderer.sendSync('getStandardFilePath', ""), (event, filename) => {
    fs.readdir(ipcRenderer.sendSync('getStandardFilePath', ""), (error, files) => {
        _updateFileList(files);
    });
});

$(document).ready(function () {
    $(".fileList").on('click', "*", function (event) {
        var fileName = $(this).text();
        Logger.info("Opening File: " + fileName, ModuleName);
        console.log("sdf")
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
        htmlToAppend += "<div class='fileElement'>" + file + "</div>";
    });
    $(".fileList").html(htmlToAppend);
}
