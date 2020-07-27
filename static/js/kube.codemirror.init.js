// 获取当前URL路径
function GetCurl() {
  var url = location.pathname; // 	获取当前URL的路径部分
   if (url.indexOf("/") != -1) {
     var str = url.substr(1);
     var arry = str.split("/");
   }
   return arry
}

var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,     // 显示行数
    indentUnit: 2,         // 缩进单位为2
    styleActiveLine: true, // 当前行背景高亮
    matchBrackets: true,   // 括号匹配
    mode: 'text/x-yaml',   // yaml格式
    lineWrapping: true,    // 自动换行
    theme: 'monokai',      // 使用monokai模版
    lineSeparator: '\n',
});

editor.setOption("extraKeys", {
    // Tab键换成2个空格
    Tab: function(cm) {
        var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
        cm.replaceSelection(spaces);
    },
    // F11键切换全屏
    "F11": function(cm) {
        cm.setOption("fullScreen", !cm.getOption("fullScreen"));
    },
    // Esc键退出全屏
    "Esc": function(cm) {
        if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
    }
});

// add deployment
$('.add_yamlValid').click(function () {
    editor.save();
    $.ajax({
        url: '/kubernetes/create_deployment',
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据添加成功!</h5>", function(){ self.location='/kubernetes/deployment'; });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// update deployment
$('.up_yamlValid').click(function () {
    editor.save();
    var path = GetCurl();
    $.ajax({
        url: window.location.pathname,
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据更新成功!</h5>", function(){ self.location='/kubernetes/deployment'; });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// add daemonset
$('.add_daemonValid').click(function () {
    editor.save();
    $.ajax({
        url: '/kubernetes/create_daemonset',
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据添加成功!</h5>", function(){ self.location='/kubernetes/daemonset'; });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// update daemonset
$('.up_daemonValid').click(function () {
    editor.save();
    var path = GetCurl();
    $.ajax({
        url: window.location.pathname,
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据更新成功!</h5>", function(){ self.location='/kubernetes/daemonset'; });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// add statefulset
$('.add_statefulsetValid').click(function () {
    editor.save();
    $.ajax({
        url: '/kubernetes/create_statefulset',
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据添加成功!</h5>", function(){ self.location='/kubernetes/statefulset'; });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// change statefulset
$('.up_statefulsetValid').click(function () {
    editor.save();
    var path = GetCurl();
    $.ajax({
        url: window.location.pathname,
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据更新成功!</h5>", function(){ self.location='/kubernetes/statefulset'; });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// add service
$('.add_svcValid').click(function () {
    editor.save();
    $.ajax({
        url: '/kubernetes/create_service',
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据添加成功!</h5>", function(){ self.location='/kubernetes/service'; });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// update service
$('.up_svcValid').click(function () {
    editor.save();
    var path = GetCurl();
    $.ajax({
        url: window.location.pathname,
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据更新成功!</h5>", function(){ self.location='/kubernetes/service'; });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// add ingress
$('.add_ingressValid').click(function () {
    editor.save();
    $.ajax({
        url: '/kubernetes/create_ingress',
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据添加成功!</h5>", function(){ self.location='/kubernetes/ingress'; });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// update ingress
$('.up_ingressValid').click(function () {
    editor.save();
    var path = GetCurl();
    $.ajax({
        url: window.location.pathname,
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据更新成功!</h5>", function(){ self.location='/kubernetes/ingress'; });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// add configmap
$('.add_configValid').click(function () {
    editor.save();
    $.ajax({
        url: '/kubernetes/create_configmap',
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据添加成功!</h5>", function(){ self.location='/kubernetes/configmap'; });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// update configmap
$('.up_configValid').click(function () {
    editor.save();
    $.ajax({
        url: window.location.pathname,
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据更新成功!</h5>", function(){ self.location='/kubernetes/configmap'; });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// add secrets
$('.add_secretsValid').click(function () {
    editor.save();
    $.ajax({
        url: '/kubernetes/create_secrets',
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据添加成功!</h5>", function(){ self.location='/kubernetes/secrets'; });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// update secrets
$('.up_secretsValid').click(function () {
    editor.save();
    $.ajax({
        url: window.location.pathname,
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据更新成功!</h5>", function(){ self.location='/kubernetes/secrets'; });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// create persistentvolume
$('.add_pvValid').click(function () {
    editor.save();
    $.ajax({
        url: '/kubernetes/create_persistentvolume',
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据添加成功!</h5>", function(){ self.location='/kubernetes/persistentvolume'; });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// update persistentvolume
$('.up_pvValid').click(function () {
    editor.save();
    $.ajax({
        url: '/kubernetes/change_persistentvolume',
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据更新成功!</h5>", function(){ self.location='/kubernetes/persistentvolume'; });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// create persistentvolume
$('.add_pvcValid').click(function () {
    editor.save();
    $.ajax({
        url: '/kubernetes/create_persistentvolumeclaim',
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据添加成功!</h5>", function(){
              self.location='/kubernetes/persistentvolumeclaim';
            });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// update persistentvolumeclaim
$('.up_pvcValid').click(function () {
    editor.save();
    $.ajax({
        url: '/kubernetes/change_persistentvolumeclaim',
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据更新成功!</h5>", function(){
              self.location='/kubernetes/persistentvolumeclaim';
            });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// create gateway
$('.add_gatewayValid').click(function () {
    editor.save();
    $.ajax({
        url: '/kubernetes/create_gateway',
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据添加成功!</h5>", function(){
              self.location='/kubernetes/gateway';
            });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// update gateway
$('.up_gatewayValid').click(function () {
  editor.save();
  $.ajax({
    url: window.location.pathname,
    type: "post",
    data: {
      code: $('#code').val(),
      csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
    },
    success: function (result) {
      if (result == 'success') {
        bootbox.alert("<h5 class='text-center'>数据更新成功!</h5>", function(){ self.location='/kubernetes/gateway'; });
      } else {
        bootbox.alert(result)
      }
    },
    error: function (result) {
      bootbox.alert(result)
    }
  });
});

// create virtualservice
$('.add_vsvcValid').click(function () {
    editor.save();
    $.ajax({
        url: '/kubernetes/create_virtualservice',
        type: "post",
        data: {
          code: $('#code').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据添加成功!</h5>", function(){
              self.location='/kubernetes/virtualservice';
            });
          } else {
            bootbox.alert(result)
          }
        },
        error: function (result) {
          bootbox.alert(result)
        }
    });
});

// update virtualservice
$('.up_vsvcValid').click(function () {
  editor.save();
  $.ajax({
    url: window.location.pathname,
    type: "post",
    data: {
      code: $('#code').val(),
      csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
    },
    success: function (result) {
      if (result == 'success') {
        bootbox.alert("<h5 class='text-center'>数据更新成功!</h5>", function(){
          self.location='/kubernetes/virtualservice';
        });
      } else {
        bootbox.alert(result)
      }
    },
    error: function (result) {
      bootbox.alert(result)
    }
  });
});