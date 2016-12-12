var fs = require('fs');
var Logger = require('./util/logger');
var fileUtil = require('./util/file-util');
var Editor = require('./editor');
var ipcRenderer = require('electron').ipcRenderer;
var $ = require('jquery');
const ModuleName = "DirectoryModule";

fs.readdir(ipcRenderer.sendSync('getStandardFilePath', ""), (error, files) => {
    updateFileList(files);
});

fs.watch(ipcRenderer.sendSync('getStandardFilePath', ""), (event, filename) => {
    fs.readdir(ipcRenderer.sendSync('getStandardFilePath', ""), (error, files) => {
        updateFileList(files);
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

function updateFileList(files) {
    if (files === undefined) {
        return;
    }
    var htmlToAppend = "";
    files.forEach(function (file, index, array) {
        htmlToAppend += "<div class='fileElement'>" + file + "</div>";
    });
    $(".fileList").html(htmlToAppend);
}
