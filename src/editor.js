var $ = require('jquery');
var markdown = require('markdown').markdown;
$(document).ready(function() {
  $(".editorFrame").bind('input propertychange', function() {
    var self = this;
    console.log(markdown.toHTML(self.value));
    $(".previewFrame").html(markdown.toHTML(self.value));

  });
});
