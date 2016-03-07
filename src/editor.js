var $ = require('jquery');
var markdown = require('markdown').markdown;
var Constants = require('./util/constants.js');
var ipcRenderer = require('electron').ipcRenderer;

$(document).ready(function() {
  $(".editorFrame").bind('input propertychange', function() {
    var self = this;
    console.log(markdown.toHTML(self.value));
    $(".previewFrame").html(markdown.toHTML(self.value));
    ipcRenderer.sendSync('setCurrentContent', self.value);
  });
});
