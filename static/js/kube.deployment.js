// 获取当前URL路径
function GetCurl() {
  var url = location.pathname; // 	获取当前URL的路径部分
   if (url.indexOf("/") != -1) {
     var str = url.substr(1);
     var arry = str.split("/");
   }
   return arry
}

// deployment table
function deployment(url){
  // 隐藏错误，在控制台打印
  $.fn.dataTable.ext.errMode = 'none';
  
  $('#deployment_table').on('error.dt', function(e, settings, techNote, message) {
     console.log( 'An error has been reported by DataTables: ', message );
  });
  
  $('#deployment_table').DataTable({
    "ajax": {
      url: url,
      type: "POST",
      dataType: "json",
      dataSrc: ''
    },
    "columns": [
      {"data": "name"},
      {"data": "labels" },
      {"data": "image"},
      {"data": "status"},
      {"data": "create_time"},
    ],
    "columnDefs" : [
      {
        "targets": 5, // 操作按钮目标列(从0开始)
        "data": null,
        "render" : function (data, type, row) {
          var cluster = $('#cluster').val();
          var namespace = $('#namespace').val();
          // 编辑页面
          var yaml = '/kubernetes/' + cluster + '/' + namespace + '/' + row.name + '/change_deployment';
          var image = '/kubernetes/' + cluster + '/' + namespace + '/' + row.name + '/images_deployment';
          var replicas ='/kubernetes/' + cluster + '/' + namespace + '/' + row.name + '/replicas_deployment';
          // 操作按钮
          var html = "<a class='btn btn-primary btn-xs btn_margin' href='" + replicas + "'>更新实例数</a>";
          html += "<a class='btn btn-info btn-xs btn_margin info_margin' href='" + image + "'>更新镜像</a>";
          html += "<a class='btn btn-warning btn-xs btn_margin info_margin' href='" + yaml + "'>更新YAML</a>";
          html += "<button type='button' id='deployment_del' class='btn btn-danger btn-xs btn_margin info_margin'>删除</button>";
          return html;
        },
      }
    ],
    "bLengthChange": false,
    "bFilter": true,
    "bInfo": false,
    "bAutoWidth": false,
    "destroy": true,  // 重新加载表格数据, 存在性能问题.
    "oLanguage": {
      "search": '搜索: ',
      "sZeroRecords": "没有找到符合条件的数据",
      "oPaginate": {
        "sFirst": "首页",
        "sPrevious": "上一页",
        "sNext": "下一页",
        "sLast": "末页"
      }
    }
  });
}

$(function () {
  // 默认加载数据
  url = '/kubernetes/' + $('#cluster').val() + '/' + $('#namespace').val() + '/read_deployment';
  deployment(url);
  // 根据集群加载默认数据
  $('#cluster').change(function () {
    url = '/kubernetes/' + $('#cluster').val() + '/' + $('#namespace').val() + '/read_deployment';
    deployment(url);
  });
  // 根据命名空间加载默认数据
  $('#namespace').change(function () {
    url = '/kubernetes/' + $('#cluster').val() + '/' + $('#namespace').val() + '/read_deployment';
    deployment(url);
  });
});

// deployment delete
$('#deployment_table').on('click', 'button#deployment_del',function () {
  var data = $("#deployment_table").DataTable().row( $(this).parents('tr') ).data();
  bootbox.confirm({
    title: "提示内容:",
    message: "删除操作是不可恢复的，你确认要删除吗？",
    buttons: {
      cancel: {
        label: '<i class="fa fa-times"></i>取消',
        className: 'btn-danger'
      },
      confirm: {
          label: '<i class="fa fa-"></i>确认',
          className: 'btn-primary'
      }
    },
    callback: function (result) {
      var cluster = $('#cluster').val();
      var namespace = $('#namespace').val();
      
      if (result) {
        $.ajax({
          url: '/kubernetes/' + cluster + '/' + namespace + '/' + data.name + '/delete_deployment',
          type: "post",
          data: {
            csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
          },
          success: function (result) {
            if (result) {
              bootbox.alert("<h5 class='text-center'>数据已成功删除!</h5>", function(){ window.location.reload(); });
            } else {
              return
            }
          }
        });
      }
    }
  });
});

// update deployment image
$(function () {
  $('#up_imageForm').bootstrapValidator({
    message: 'This value is not valid',
    fields: {
      image: {
        validators: {
          notEmpty: {
            message: '镜像版本名称不能为空, 请重新输入镜像版本名称.'
          },
        }
      },
      container: {
        validators: {
          notEmpty: {
            message: '容器名称不能为空, 请选择容器名称.'
          },
        }
      },
    }
  });
  $('.up_imageValid').click(function () {
    var path = GetCurl(); // 获取当前URL路径
    $('#up_imageForm').bootstrapValidator('validate');
    if ($('#up_imageForm').data("bootstrapValidator").isValid()) {
      $.ajax({
        url: '/kubernetes/' + path[1] + '/' + path[2] + '/' + path[3] + '/images_deployment',
        type: "post",
        data: {
          image: $('#image').val(),
          container: $('#container').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据更新成功!</h5>", function(){ self.location='/kubernetes/deployment'; });
          } else {
            bootbox.alert(result);
          }
        },
        error: function (result) {
          bootbox.alert(result);
        }
      });
    }
  });
  $('.up_imageReset').click(function () {
    $('#up_imageForm').data('bootstrapValidator').resetForm(true);
  });
});

// update deployment replicas
$(function () {
  $('#up_resForm').bootstrapValidator({
    message: 'This value is not valid',
    fields: {
      replicas: {
        validators: {
          notEmpty: {
            message: '实例数量不能为空, 请重新输入实例数量.'
          },
        }
      },
    }
  });
  $('.up_resValid').click(function () {
    var path = GetCurl(); // 获取当前URL路径
    $('#up_resForm').bootstrapValidator('validate');
    if ($('#up_resForm').data("bootstrapValidator").isValid()) {
      $.ajax({
        url: '/kubernetes/' + path[1] + '/' + path[2] + '/' + path[3] + '/replicas_deployment',
        type: "post",
        data: {
          replicas: $('#replicas').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据更新成功!</h5>", function(){ self.location='/kubernetes/deployment'; });
          } else {
            bootbox.alert(result);
          }
        },
        error: function (result) {
          bootbox.alert(result);
        }
      });
    }
  });
  $('.up_resReset').click(function () {
    $('#up_resForm').data('bootstrapValidator').resetForm(true);
  });
});
