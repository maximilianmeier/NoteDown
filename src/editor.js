var $ = require('jquery');
var markdown = require('marked');
var ipcRenderer = require('electron').ipcRenderer;


exports.openFile = function (file) {
    createPanel();
    $("#editor").text(file);
    var editor = ace.edit("editor");
    var MarkDownMode = ace.require("ace/mode/markdown").Mode;
    editor.session.setMode(new MarkDownMode());
    editor.getSession().on('change', function (e) {
        $(".previewFrame").html(markdown(editor.getValue()));
        ipcRenderer.sendSync('setCurrentContent', editor.getValue());
    });

    $(".previewFrame").html(markdown(file));
    watchInput();
};

exports.closeFile = function () {
    createNoPanel();
}

exports.closeFileMainProcess = function (focusedWindow) {
    var code = "<div class=\"headline\">Please open a file</div>";
    focusedWindow.webContents.executeJavaScript("document.getElementById('editor').innerHTML = '" + code + "';");
}

function createPanel() {
    $(".editor").html("<div class='mainWindowPane previewPane'><div class='previewHeader headline'>Preview</div><div class='previewFrame'></div></div><div class='mainWindowPane editorPane'><div class='editorHeader headline'>Editor</div><div class='editorFrame'><div id='editor'></div></div></div>")
}

function createNoPanel() {
    $(".editor").html("<div class='headline'>Please open a file</div>");
}

function watchInput() {
    $("#editor").bind('input propertychange', function () {
        var self = this;
        $(".previewFrame").html(markdown(self.value));
        ipcRenderer.sendSync('setCurrentContent', self.value);
    });
}
