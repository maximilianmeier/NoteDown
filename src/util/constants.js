function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define("STANDARD_FILE_PATH", "/Users/MaxiMac/Documents/NoteDown/");
define("SETTINGS_FILE_NAME", "settings.json");

exports.currentContent = undefined;
