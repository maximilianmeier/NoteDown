var fileUtil = require('./util/file-util.js');
var dialog = require('electron').dialog;
var Logger = require('./util/logger.js');
var Constants = require('./util/constants.js');
var fs = require('fs');

exports.createNewMarkdownFile = function() {
  dialog.showSaveDialog({
    title: 'Create new file',
    defaultPath: global.settingsFile.STANDARD_FILE_PATH,
    filters: [{
      name: 'MarkDown',
      extensions: ['md']
    }]
  }, function(fileName) {
    if (fileName === undefined) {
      Logger.error("Filename is undefined!");
      return;
    }
    fileUtil.createNewFile(fileName);
  });
};

exports.saveMarkdownFile = function() {
  var currentFile = global.settingsFile.CURRENT_FILE;
  var currentContent = global.CURRENT_CONTENT;
  console.log(currentFile);
  console.log(global.CURRENT_CONTENT);
  fs.writeFileSync(currentFile, currentContent, 'utf-8');
};
