var APPNAME_TAG = '[NOTEDOWN]';
exports.log = function(input) {
  console.log(APPNAME_TAG + input);
};

exports.error = function(input) {
  console.log(APPNAME_TAG + '[ERROR]: ' + input);
};

exports.info = function(input) {
  console.log(APPNAME_TAG + '[INFO]: ' + input);
};
