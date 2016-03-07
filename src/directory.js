var fs = require('fs');
var Logger = require('./util/logger.js');
var fileUtil = require('./util/file-util.js');
var Constants = require('./util/constants.js');
var remote = require('electron').remote;
var markdown = require('markdown').markdown;
var ipcRenderer = require('electron').ipcRenderer;
var Constants = require('./util/constants.js');
var $ = require('jquery');

fs.readdir(remote.getGlobal('settingsFile').STANDARD_FILE_PATH, (error, files) => {
  console.log(remote.getGlobal('settingsFile').STANDARD_FILE_PATH);
  updateFileList(files);
});

fs.watch(remote.getGlobal('settingsFile').STANDARD_FILE_PATH, (event, filename) => {
  fs.readdir(remote.getGlobal('settingsFile').STANDARD_FILE_PATH, (error, files) => {
    updateFileList(files);
  });
});

$(document).ready(function() {
  $(".fileList").on('click', "*", function(event) {
    var fileName = $(this).text();
    var file = fileUtil.openFile(remote.getGlobal('settingsFile').STANDARD_FILE_PATH + '/' + fileName);
    console.log(file);
    $(".editorFrame").text(file);
    $(".previewFrame").html(markdown.toHTML(file));
    ipcRenderer.sendSync('setCurrentContent', file);
    ipcRenderer.sendSync('setCurrentFile', remote.getGlobal('settingsFile').STANDARD_FILE_PATH + '/' + fileName);
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
