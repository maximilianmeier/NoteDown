var fs = require('fs');
var Handlebars = require('handlebars');
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
exports.loadTemplate = function (templateName, data, extension) {
    Handlebars.registerHelper('date-fmt', function (timestamp){
        return timestamp.toLocaleDateString();
    });
    if (!extension) {
        extension = 'hbs';
    }
    var source = fs.readFileSync(__dirname + '/../templates/' + templateName + '.' + extension, 'utf-8');

    var template = Handlebars.compile(source);
    var html = template(data);
    return html;
}
