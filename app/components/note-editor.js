import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    valueUpdated(newValue) {
      this.set('hasChanges', true);
      this.set('file.noteContent', newValue);
    },
    closeFile() {
      this.sendAction('closeFile');
    }
  }
});
