var fs = require('fs');
var Logger = require('./util/logger.js');
var fileUtil = require('./util/file-util.js');
var Constants = require('./util/constants.js');
var $ = require('jquery');

fs.readdir(Constants.STANDARD_FILE_PATH, (error, files) => {
  updateFileList(files);
});

fs.watch(Constants.STANDARD_FILE_PATH, (event, filename) => {
  fs.readdir(Constants.STANDARD_FILE_PATH, (error, files) => {
    updateFileList(files);
  });
});

$(document).ready(function() {
  $(".fileList").on('click', "*", function(event) {
    var fileName = $(this).text();
    var file = fileUtil.openFile(Constants.STANDARD_FILE_PATH + fileName);
    $(".editorFrame").text(file);
  });
});

function updateFileList(files) {
  var htmlToAppend = "";
  files.forEach(function(file, index, array) {
    htmlToAppend += "<div class='fileElement'>" + file + "</div>";
  });
  $(".fileList").html(htmlToAppend);
}
