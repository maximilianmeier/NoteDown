import Ember from 'ember';
const { ipcRenderer } = require ('electron');
const fs = require('fs');

export default Ember.Route.extend({
  fileUtil: Ember.inject.service('file-util'),

  model() {
    return this.store.findAll('file-info');
  },

  afterModel() {
    let filePath = process.env.HOME + '/Documents/NoteDown/';
    let _this = this;
    ipcRenderer.on('note:save', () => {
      _this.controllerFor('application').send('saveCurrentFile');
    });

    ipcRenderer.on('note:new', () => {
      _this.get('fileUtil').createNewMarkdownFile();
    });

    fs.watch(filePath, () => {
      _this.refresh();
    });
  }
});
