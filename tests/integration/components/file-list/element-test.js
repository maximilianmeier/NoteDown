import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('file-list/element', 'Integration | Component | file list/element', {
  integration: true
});

test('it renders', function (assert) {

  this.set('testFile', {
    "file": "Test.md",
    "stats": {
      "dev": 16777220,
      "mode": 33188,
      "nlink": 1,
      "uid": 501,
      "gid": 20,
      "rdev": 0,
      "blksize": 4096,
      "ino": 44745327,
      "size": 38,
      "blocks": 8,
      "atime": "2017-02-11T11:35:41.000Z",
      "mtime": new Date("2017-02-07T14:56:18.000Z"),
      "ctime": "2017-02-07T14:56:18.000Z",
      "birthtime": "2016-12-12T14:22:32.000Z"
    }
  });

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{file-list/element file=testFile}}`);

  assert.equal(this.$().text().trim().replace(/(\r\n|\n|\r)/gm, ""), 'Test.md  38 B | 07/02/2017');

  // Template block usage:
  this.render(hbs`
    {{#file-list/element file=testFile}}
      template block text
    {{/file-list/element}}
  `);

  assert.equal(this.$().text().trim().replace(/(\r\n|\n|\r)/gm, ""), 'Test.md  38 B | 07/02/2017');
});
