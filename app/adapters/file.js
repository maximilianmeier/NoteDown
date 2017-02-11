import DS from 'ember-data';
const fs = require('fs');

export default DS.JSONAPIAdapter.extend({
  findRecord(store, type, id, snapshot) {
    let filePath = '/Users/MaxiMac/Documents/NoteDown/' + id;
    let file = fs.readFileSync(filePath, 'utf8');
    console.log({id: id, noteContent: file})
    return {id: id, noteContent: file};
  }
});
