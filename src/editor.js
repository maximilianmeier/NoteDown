var $ = require('jquery');
var markdown = require('marked');
var { ipcRenderer } = require('electron');
var TemplateLoader = require('./util/template-loader');
const ModuleName = "EditorModule";
var settings = require('./util/settings');
settings.reload();


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
        settings.set('CURRENT_CONTENT', editor.getValue());
    });

    ipcRenderer.on('note:close', (event, message) => {
        _createNoPanel();
    });

    $(".previewFrame").html(markdown(file));
    _watchInput();
};

/**
 * Initializes new editor frame with preview window.
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */
function _createPanel() {
    $(".editor").html(TemplateLoader.loadTemplate('editor-panel'));
}

/**
 * Closes current note editor.
 *
 * @since 0.1.0
 * @author Maximilian Mier
 */
function _createNoPanel() {
    $(".editor").html(TemplateLoader.loadTemplate('empty-editor-panel'));
}

/**
 * Observes the input of the editor. And executes updated for the current content. The content is not saved yet!!
 *
 * @since 0.1.0
 * @author Maximilian Meier
 */
function _watchInput() {
    $("#editor").bind('input propertychange', function () {
        var editor = ace.edit('editor');
        $(".previewFrame").html(markdown(editor.getValue()));
        settings.set('CURRENT_CONTENT', editor.getValue());
    });
}
