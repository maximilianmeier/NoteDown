var fileUtil = require('./util/file-util.js');
var dialog = require('electron').dialog;
var Logger = require('./util/logger.js');
var remote = require('electron').remote;

exports.createNewMarkdownFile = function() {
console.log(global.settingsFile.STANDARD_FILE_PATH);
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
}
