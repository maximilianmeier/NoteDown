import Ember from 'ember';
const fs = require('fs');

export default Ember.Route.extend({
  model() {
    let filePath = '/Users/MaxiMac/Documents/NoteDown/';
    let files = fs.readdirSync(filePath, 'utf8');
    let fileListWithStats = {
      files: []
    };
    files.forEach(function (file, index, array) {
      let stats = fs.statSync(filePath + "/" + file);
      fileListWithStats.files.push({file, stats});
    });
    return fileListWithStats;
  }
});
