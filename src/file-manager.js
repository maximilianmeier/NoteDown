var fileUtil = require('./util/file-util.js');
var dialog = require('electron').dialog;
var Logger = require('./util/logger.js');

exports.createNewMarkdownFile = function() {

  dialog.showSaveDialog({
    title: 'Create new file',
    defaultPath: '/Users/MaxiMac/Documents/NoteDown/',
    filters: [{
      name: 'MarkDown',
      extensions: ['md']
    }]
  }, function(fileName) {
    if (fileName === undefined) {
      logger.error("Filename is undefined!");
      return;
    }
    fileUtil.createNewFile(fileName);
  });
}
