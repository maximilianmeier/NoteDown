import Ember from 'ember';

export default Ember.Controller.extend({
  currentFile: null,

  hasChanges: false,

  currentFileContent: Ember.computed('currentFile', {
    get() {
      let currentFile = this.get('currentFile');
      return this.store.findRecord('file', currentFile.get('id'), {reload: true});
    }
  }),


  actions: {
    saveCurrentFile() {
      let _this = this;
      let currentFileContentId = this.get('currentFileContent.id');
      this.store.findRecord('file', currentFileContentId).then(function (file) {
        file.set('noteContent', _this.get('currentFileContent.noteContent'));
        file.save();
        _this.set('hasChanges', false);
        _this.get('target.router').refresh();
      });
    },
    closeFile() {
      if(this.get('hasChanges')) {
        var willClose = confirm("You have unsaved changes! If you close now, changes will be lost");
        if(willClose) {
          this.set('currentFile', null);
        }
      } else {
        this.set('currentFile', null);
      }
    }
  }

})
;
