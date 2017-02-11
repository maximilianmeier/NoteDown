import Ember from 'ember';
const markdown = require('marked');

export function md2html([markdownCode, ...rest]) {
  if (rest.length > 0) {
    console.error("There should be no other parameter", rest);
  }
  if (markdownCode) {
    return markdown(markdownCode);
  } else {
    return '';
  }
}

export default Ember.Helper.helper(md2html);
