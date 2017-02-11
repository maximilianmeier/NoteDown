import Ember from 'ember';
var dialog = require('electron').remote.dialog;
var fs = require('fs');

export default Ember.Service.extend({
  createNewMarkdownFile() {
    let _this = this;
    let filePath = process.env.HOME + '/Documents/NoteDown/';
    dialog.showSaveDialog({
      title: 'Create new file',
      defaultPath: filePath,
      filters: [{
        name: 'MarkDown',
        extensions: ['md']
      }]
    }, function (fileName) {
      if (fileName === undefined) {
        console.error("Filename is undefined!");
        return;
      }
      return _this.createNewFile(fileName);
    });
  },

  createNewFile(completeFilePath) {
    fs.writeFileSync(completeFilePath, "", "utf-8");
    return true;
  }
});
