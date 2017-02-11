
import { md2html } from 'note-down/helpers/md2html';
import { module, test } from 'qunit';

module('Unit | Helper | md2html');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = md2html(["# headline"]);
  assert.equal(result, "<h1 id=\"headline\">headline</h1>\n", "Must be converted to HTML");
});

