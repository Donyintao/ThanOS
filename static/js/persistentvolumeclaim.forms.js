function GetUrl() {
  var url = location.search;  // 获取url中"?"符后的字串
  var result = new Object();
  if (url.indexOf("?") != -1) {
     var str = url.substr(1);
     strs = str.split("&");
     for(var i = 0; i < strs.length; i ++) {
         result[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
     }
  }
  return result;
}

// persistentvolume table
function initialization(url, data){
  $('#pvc_table').DataTable({
    "ajax": {
      url: url,
      type: "POST",
      dataType: "json",
      dataSrc: '',
      data: data
    },
    "columns": [
      {"data": "name"},
      {"data": "status"},
      {"data": "volume_name" },
      {"data": "capacity" },
      {"data": "access_modes"},
      {"data": "storage_class"},
      {"data": "create_time"},
    ],
    "columnDefs" : [
      {
        "targets": 7, // 操作按钮目标列(从0开始)
        "data": null,
        "render" : function (data, type, row) {
          // 编辑页面
          var yaml = '/kubernetes/change_persistentvolumeclaim?ns=' + $('#namespace').val() + '&resource=' + row.name;
          // 操作按钮
          html = "<a class='btn btn-warning btn-xs btn_margin info_margin' href='" + yaml + "'>更新YAML</a>";
          html += "<button type='button' id='pvc_del' class='btn btn-danger btn-xs btn_margin info_margin'>删除</button>";
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
  url = '/kubernetes/read_persistentvolumeclaim';
  // 默认数据
  data = {namespace: 'default'};
  initialization(url, data);
  // 根据命名空间加载数据
  $('#namespace').change(function () {
    data = {namespace: $(this).val()};
    initialization(url, data);
  });
});

// persistentvolume delete
$('#pvc_table').on('click', 'button#pvc_del',function () {
  var data = $("#pvc_table").DataTable().row( $(this).parents('tr') ).data();
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
      if (result) {
        $.ajax({
          url: '/kubernetes/delete_persistentvolumeclaim',
          type: "post",
          data: {
            name: data.name,
            namespace: $('#namespace').val(),
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

// Deployment Pod table
$(function () {
  curl = GetUrl();
  namespace = curl['ns'];
  $('#deployment_pod_table').DataTable({
    "ajax": {
      url: '/kubernetes/read_pods',
      type: "post",
      dataType: "json",
      dataSrc: '',
      data: {namespace: curl['ns'], resource: curl['resource']},
    },
    "columns": [
      {"data": "name"},
      {"data": "status"},
      {"data": "ip"}
    ],
    "columnDefs" : [
      {
        "targets": 3, // 操作按钮目标列(从0开始)
        "data": null,
        "render" : function (data, type, row) {
          var curl = '/kubernetes/terminal?ns=' + namespace + '&pod=' + row.name + '&containers=' + data.containers;
          var html = "<a class='btn btn-primary btn-xs btn_margin' href='" + curl + "'>远程登录</a>";
          html += "<a class='btn btn-info btn-xs btn_margin info_margin' href='" + "'>查看日志</a>";
          html += "<button type='button' class='btn btn-danger btn-xs btn_margin info_margin'>销毁重建</button>";
          return html;
        },
      },
      {
        "targets": 1, // 操作按钮目标列(从0开始)
        "render" : function (data, type, row) {
          if (row.status == 'Running') {
            var html = "<a class='btn btn-success btn-xs disabled btn_margin' href='javascript:void(0);'>" + row.status + "</a>";
          } else if (row.status == 'ContainerCreating') {
            var html = "<a class='btn btn-warning btn-xs disabled btn_margin' href='javascript:void(0);'>" + row.status + "</a>";
          } else {
            var html = "<a class='btn btn-danger btn-xs disabled btn_margin' href='javascript:void(0);'>" + row.status + "</a>";
          }
          return html;
        },
      },
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
    curl = GetUrl(); // 获取当前url变量
    $('#up_imageForm').bootstrapValidator('validate');
    if ($('#up_imageForm').data("bootstrapValidator").isValid()) {
      $.ajax({
        url: '/kubernetes/images_deployment',
        type: "post",
        data: {
          name: curl['resource'],
          image: $('#image').val(),
          container: $('#container').val(),
          namespace: curl['ns'],
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
    curl = GetUrl();
    console.log(curl['ns']);
    $('#up_resForm').bootstrapValidator('validate');
    if ($('#up_resForm').data("bootstrapValidator").isValid()) {
      $.ajax({
        url: '/kubernetes/replicas_deployment',
        type: "post",
        data: {
          name: curl['resource'],
          replicas: $('#replicas').val(),
          namespace: curl['ns'],
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
