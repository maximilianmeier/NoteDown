var APPNAME_TAG = '[NOTEDOWN]';
exports.log = function(input) {
  console.log(new Date().toLocaleString() + ' | ' + APPNAME_TAG + input);
};

exports.error = function(input) {
  console.log(new Date().toLocaleString() + ' | ' + APPNAME_TAG + '[ERROR]: ' + input);
};

exports.info = function(input) {
  console.log(new Date().toLocaleString() + ' | ' + APPNAME_TAG + '[INFO]: ' + input);
};
