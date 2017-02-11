import DS from 'ember-data';
const fs = require('fs');
/*jshint unused:false*/

export default DS.JSONAPIAdapter.extend({
  filePath: '',
  findAll() {
    let filePath = process.env.HOME + '/Documents/NoteDown/';
    let files = fs.readdirSync(filePath, 'utf8');
    let fileListWithStats = [];
    files.forEach(function (file) {
      let stats = fs.statSync(filePath + "/" + file);
      fileListWithStats.push({file, stats});
    });
    return {meta:'', data: fileListWithStats, errors: ''};
  },
  findRecord() {

  },

  serialize(snapshot) {
    console.log(snapshot);
  }
});
