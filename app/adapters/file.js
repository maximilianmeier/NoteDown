import DS from 'ember-data';
const fs = require('fs');
/*jshint unused:false*/

export default DS.Adapter.extend({
  findRecord(store, type, id, snapshot) {
    let filePath = process.env.HOME + '/Documents/NoteDown/' + id;
    let file = fs.readFileSync(filePath, 'utf8');
    return {id: id, noteContent: file};
  },

  updateRecord(store, type, snapshot) {
    var data = this.serialize(snapshot, { includeId: true });
    let filePath = process.env.HOME + '/Documents/NoteDown/' + data.id;
    fs.writeFileSync(filePath, data.noteContent, "utf-8");
    return data;
  }

});
