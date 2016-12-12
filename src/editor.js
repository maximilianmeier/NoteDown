var $ = require('jquery');
var markdown = require('marked');
var ipcRenderer = require('electron').ipcRenderer;
const ModuleName = "EditorModule";


/**
 * Opens new file with initializing new editor.
 *
 * @param file New File to be opened
 * @since 0.1.0
 * @author Maximilian Meier
 */
exports.openFile = function (file) {
    _createPanel();
    $("#editor").text(file);
    var editor = ace.edit("editor");
    var MarkDownMode = ace.require("ace/mode/markdown").Mode;
    editor.session.setMode(new MarkDownMode());
    editor.getSession().on('change', function (e) {
        $(".previewFrame").html(markdown(editor.getValue()));
        ipcRenderer.sendSync('setCurrentContent', editor.getValue());
    });

    $(".previewFrame").html(markdown(file));
    _watchInput();
};

/**
 * Closes current note editor. This is called from the main process!
 *
 * @param focusedWindow Current focused window.
 * @since 0.1.0
 * @author Maximilian Meier
 */
exports.closeFileMainProcess = function (focusedWindow) {
    var code = "<div class=\"headline\">Please open a file</div>";
    focusedWindow.webContents.executeJavaScript("document.getElementById('editor').innerHTML = '" + code + "';");
}

/**
 * Initializes new editor frame with preview window.
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */
function _createPanel() {
    $(".editor").html("<div class='mainWindowPane previewPane'><div class='previewHeader headline'>Preview</div><div class='previewFrame'></div></div><div class='mainWindowPane editorPane'><div class='editorHeader headline'>Editor</div><div class='editorFrame'><div id='editor'></div></div></div>")
}

/**
 * Closes current note editor.
 *
 * @since 0.1.0
 * @author Maximilian Mier
 */
function _createNoPanel() {
    $(".editor").html("<div class='headline'>Please open a file</div>");
}

/**
 * Observes the input of the editor. And executes updated for the current content. The content is not saved yet!!
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */
function _watchInput() {
    $("#editor").bind('input propertychange', function () {
        var self = this;
        $(".previewFrame").html(markdown(self.value));
        ipcRenderer.sendSync('setCurrentContent', self.value);
    });
}
