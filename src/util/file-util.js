var fs = require('fs');
exports.createNewFile = function (filePath) {
    fs.writeFileSync(filePath, "", "utf-8");
}

exports.openFile = function (filePath) {
    var file = fs.readFileSync(filePath, 'utf8');
    return file;
}
