var fs = require('fs');
exports.createNewFile = function(filePath) {
  fs.writeFileSync(filePath);
}

exports.openFile = function(filePath) {
  var file = fs.readFileSync(filePath,'utf8');
  return file;
}
