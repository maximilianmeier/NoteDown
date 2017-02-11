import DS from 'ember-data';
const fs = require('fs');
/*jshint unused:false*/

export default DS.JSONAPIAdapter.extend({
  findRecord(store, type, id, snapshot) {
    let filePath = '/Users/MaxiMac/Documents/NoteDown/' + id;
    let file = fs.readFileSync(filePath, 'utf8');
    return {id: id, noteContent: file};
  }
});
