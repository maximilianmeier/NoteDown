import Ember from 'ember';
const markdown = require('marked');

export function md2html([markdownCode, ...rest]) {
  if (markdownCode) {
    console.log(markdownCode)
    return markdown(markdownCode);
  } else {
    return '';
  }
}

export default Ember.Helper.helper(md2html);
