
import { dateFmt } from 'note-down/helpers/date-fmt';
import { module, test } from 'qunit';

module('Unit | Helper | date fmt');

// Replace this with your real tests.
test('it works', function(assert) {
  var newDate = new Date();
  let result = dateFmt([newDate]);
  assert.ok(result);
});

