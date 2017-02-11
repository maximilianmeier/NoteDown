import Ember from 'ember';

export default Ember.Controller.extend({
  currentFile: null,

  currentFileContent: Ember.computed('currentFile', {
    get() {
      let currentFile = this.get('currentFile');
      return this.store.findRecord('file', currentFile.get('id'));
    }
  }),


  actions: {
    saveCurrentFile()
    {
      let _this = this;
      let currentFileContentId = this.get('currentFileContent.id');
      this.store.findRecord('file', currentFileContentId).then(function (file) {
        file.set('noteContent', _this.get('currentFileContent.noteContent'));
        file.save();
        _this.get('target.router').refresh();
      });
    }
  }

})
;
