import Ember from 'ember';

export function dateFmt([timestamp, ...rest]) {
  if (rest) {
    console.error("There should be no other parameter");
  }
  return timestamp.toLocaleDateString();
}

export default Ember.Helper.helper(dateFmt);
