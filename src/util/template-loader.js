var fs = require('fs');
var FileUtil = require('./file-util');

/**
 * Util class for loading templates.
 */

/**
 * Loads a template. This is a synchronous execution!
 *
 * @param templateName Name of the template that should be loaded.
 * @since 0.1.0
 * @author Maximilian Meier
 */
exports.loadTemplate = function (templateName, extension) {
    if(!extension) {
        extension = 'html';
    }
    var filePath = __dirname + '/../templates/' + templateName + '.' + extension;
    return FileUtil.openFile(filePath);
}
