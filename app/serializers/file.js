import DS from 'ember-data';
/*jshint unused:false*/

export default DS.Serializer.extend({

  serialize(snapshot, options) {
    var json = {
      id: snapshot.id
    };

    snapshot.eachAttribute((key, attribute) => {
      json[key] = snapshot.attr(key);
    });

    snapshot.eachRelationship((key, relationship) => {
      if (relationship.kind === 'belongsTo') {
        json[key] = snapshot.belongsTo(key, { id: true });
      } else if (relationship.kind === 'hasMany') {
        json[key] = snapshot.hasMany(key, { ids: true });
      }
    });

    return json;
  },

  normalize (modelClass, resourceHash) {
    var data = {
      id:            resourceHash.id,
      type:          modelClass.modelName,
      attributes:    resourceHash
    };
    return { data: data };

  },

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    let _this = this;
    if (requestType === 'findRecord') {
      return this.normalize(primaryModelClass, payload);
    } else if (requestType === 'updateRecord') {
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
