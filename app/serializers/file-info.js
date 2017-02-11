import DS from 'ember-data';
/*jshint unused:false*/

export default DS.Serializer.extend({
  serialize(snapshot, options) {
    return true;
  },
  normalize (modelClass, resourceHash) {
    var data = {
      id:            resourceHash.file,
      type:          modelClass.modelName,
      attributes:    resourceHash
    };
    return { data: data };

  },
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    let _this = this;
    if (requestType === 'findRecord') {
      return this.normalize(primaryModelClass, payload);
    } else {
      let documentHash = { data: [], included: [] };
      payload.data.forEach(function(item) {
        let { data, included } = _this.normalize(primaryModelClass, item);
        documentHash.data.push(data);
      });
      return documentHash;
    }
  }
});
