// 说明: 使用CodeMirror-5.15.0版本会出现只能写入500行，升级到5.15.2或5.16.0版本可以解决这个问题
var editor = CodeMirror.fromTextArea(document.getElementById("container"), {
  lineNumbers: true,     // 显示行数
  styleActiveLine: true, // 当前行背景高亮
  readOnly: true,        // 只读模式
  theme: 'monokai',      // 使用monokai模版
});

// Pod container logs
function Container(data) {
  $.ajax({
    url: window.location.pathname,
    type: "post",
    data: data,
    success: function (result) {
      //
      editor.setSize('auto','500px');
      editor.getDoc().setValue(result);
      editor.refresh();
      /*
      var doc = editor.getDoc();
      var cursor = doc.getCursor();
      var line = doc.getLine(cursor.line);
      var pos = {
          line: editor.lastLine(),
          ch: line.length - 1
      };
      doc.replaceRange(result, pos); // adds a new line
      // 跳转到编辑器底部
      editor.execCommand("goDocEnd");
      */
    },
    error: function (result) {
      bootbox.alert(result)
    }
  })
};

$(function () {
  // 默认加载数据
  data= {
    lines: $('#lines').val(),
    csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
  };
  Container(data);
  // 根据显示行数加载数据
  $('#lines').change(function () {
    console.log($('#lines').val());
    data= {
      lines: $('#lines').val(),
      csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
    };
    Container(data);
  })
});