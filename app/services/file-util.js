import Ember from 'ember';
var dialog = require('electron').remote.dialog;
var fs = require('fs');

export default Ember.Service.extend({
  isDialogShown: false,
  createNewMarkdownFile() {
    let _this = this;
    let filePath = process.env.HOME + '/Documents/NoteDown/';
    if (!this.get('isDialogShown')) {
      this.set('isDialogShown', true);
      dialog.showSaveDialog({
        title: 'Create new file',
        defaultPath: filePath + '/Note',
        buttonLabel: 'Create',
        filters: [{
          name: 'MarkDown',
          extensions: ['md']
        }]
      }, function (fileName) {
        _this.set('isDialogShown', false);
        if (fileName === undefined) {
          console.error("Filename is undefined!");
          return;
        }
        return _this.createNewFile(fileName);
      });
    }
  },

  createNewFile(completeFilePath) {
    fs.writeFileSync(completeFilePath, "", "utf-8");
    return true;
  }
});
