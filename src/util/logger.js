var APPNAME_TAG = '[NOTEDOWN]';

/**
 * Logger for the application with additional information.
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */
module.exports = {
    /**
     * Log of information
     *
     * @param message Message that should be displayed.
     * @param moduleName Module name where the function is called from
     * @since 0.1.0
     * @author Maximilian Meier
     */
    log: function (message, moduleName) {
        if (!moduleName) {
            moduleName = "General"
        }
        console.log(new Date().toLocaleString() + ' | ' + APPNAME_TAG + ' | ' + moduleName + ' | [LOG]: ' + message);
    },

    /**
     * Error log of information
     *
     * @param message Message that should be displayed.
     * @param moduleName Module name where the function is called from
     * @since 0.1.0
     * @author Maximilian Meier
     */
    error: function (message, moduleName) {
        if (!moduleName) {
            moduleName = "General"
        }
        console.error(new Date().toLocaleString() + ' | ' + APPNAME_TAG + ' | ' + moduleName + ' | [ERROR]: ' + message);
    },

    /**
     * Info log of information
     *
     * @param message Message that should be displayed.
     * @param moduleName Module name where the function is called from
     * @since 0.1.0
     * @author Maximilian Meier
     */
    info: function (message, moduleName) {
        if (!moduleName) {
            moduleName = "General"
        }
        console.info(new Date().toLocaleString() + ' | ' + APPNAME_TAG + ' | ' + moduleName + ' | [INFO]: ' + message);
    }
}

