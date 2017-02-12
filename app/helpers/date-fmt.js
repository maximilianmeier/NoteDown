import Ember from 'ember';

export function dateFmt([timestamp, ...rest]) {
  if (rest.length > 0) {
    console.error("There should be no other parameter", rest);
  }
  return timestamp.toLocaleDateString();
}

export default Ember.Helper.helper(dateFmt);
