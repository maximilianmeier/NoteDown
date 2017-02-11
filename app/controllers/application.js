import Ember from 'ember';

export default Ember.Controller.extend({
  currentFile: null,

  currentFileContent: null,

  loadContent: Ember.observer('currentFile', function() {
    let currentFile = this.get('currentFile');
    let currentFileContent = this.store.findRecord('file', currentFile.get('id'));
    console.log(currentFile.get('stats'))
    this.set('currentFileContent', currentFileContent);
  })

});
