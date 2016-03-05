var myApp = require('../src/app.js');
QUnit.module("app.js");
test("testSum", function(assert) {
  var result = myApp.createSum(3, 4);
  assert.ok(result === 7);
});
