var APPNAME_TAG = '[NOTEDOWN]';
module.exports = {
    log: function (input, moduleName) {
        if (!moduleName) {
            moduleName = "General"
        }
        console.log(new Date().toLocaleString() + ' | ' + APPNAME_TAG + ' | ' + moduleName + ' | [LOG]: ' + input);
    },

    error: function (input, moduleName) {
        if (!moduleName) {
            moduleName = "General"
        }
        console.error(new Date().toLocaleString() + ' | ' + APPNAME_TAG + ' | ' + moduleName + ' | [ERROR]: ' + input);
    },

    info: function (input, moduleName) {
        if (!moduleName) {
            moduleName = "General"
        }
        console.info(new Date().toLocaleString() + ' | ' + APPNAME_TAG + ' | ' + moduleName + ' | [INFO]: ' + input);
    }
}

