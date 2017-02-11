import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    valueUpdated(newValue) {
      this.set('file.noteContent', newValue);
    }
  }
});
