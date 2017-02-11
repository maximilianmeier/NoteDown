import Ember from 'ember';
const { ipcRenderer } = require ('electron');

export default Ember.Route.extend({
  model() {
    return this.store.findAll('file-info');
  },

  afterModel() {
    ipcRenderer.on('note:save', () => {
      this.controllerFor('application').send('saveCurrentFile');
    });
  }
});
