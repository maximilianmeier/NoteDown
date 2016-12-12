var fs = require('fs');
var Logger = require('./util/logger.js');
var fileUtil = require('./util/file-util.js');
var Constants = require('./util/constants.js');
var Editor = require('./editor.js');
var remote = require('electron').remote;
var markdown = require('marked');
var ipcRenderer = require('electron').ipcRenderer;
var Constants = require('./util/constants.js');
var $ = require('jquery');

fs.readdir(ipcRenderer.sendSync('getStandardFilePath', ""), (error, files) => {
  console.log(ipcRenderer.sendSync('getStandardFilePath', ""));
  updateFileList(files);
});

fs.watch(ipcRenderer.sendSync('getStandardFilePath', ""), (event, filename) => {
  fs.readdir(ipcRenderer.sendSync('getStandardFilePath', ""), (error, files) => {
    updateFileList(files);
  });
});

$(document).ready(function() {
  $(".fileList").on('click', "*", function(event) {
    var fileName = $(this).text();
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
  files.forEach(function(file, index, array) {
    htmlToAppend += "<div class='fileElement'>" + file + "</div>";
  });
  $(".fileList").html(htmlToAppend);
}
