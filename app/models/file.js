import DS from 'ember-data';

export default DS.Model.extend({
  noteContent: DS.attr('string')
});
