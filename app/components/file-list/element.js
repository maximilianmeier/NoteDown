import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    setAsCurrentFile() {
      this.set('currentFile', this.get('file'));
    }
  }
});
