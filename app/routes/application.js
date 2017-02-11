import Ember from 'ember';
const { ipcRenderer } = require ('electron');

export default Ember.Route.extend({
  fileUtil: Ember.inject.service('file-util'),

  model() {
    return this.store.findAll('file-info');
  },

  afterModel() {
    ipcRenderer.on('note:save', () => {
      this.controllerFor('application').send('saveCurrentFile');
    });

    ipcRenderer.on('note:new', () => {
      this.get('fileUtil').createNewMarkdownFile();
    });
  }
});
