// 获取当前URL路径
function GetCurl() {
  var url = location.pathname;            // 获取当前URL的路径部分
   if (url.indexOf("/") != -1) {
     var str = url.substr(1);
     var arry = str.split("/");
   }
   return arry
}

// Pod table
function Pod(url){
  $('#pod_table').DataTable({
    "ajax": {
      url: url,
      type: "post",
      dataType: "json",
      dataSrc: '',
    },
    "columns": [
      {"data": "name"},
      {"data": "container_status"},
      {"data": "status"},
      {"data": "node"},
      {"data": "ip"},
      {"data": "create_time"},
    ],
    "columnDefs" : [
      {
        "targets": 0, // 操作按钮目标列(从0开始)
        "render" : function (data, type, row) {
          var cluster = $('#cluster').val();
          var namespace = $('#namespace').val();
          // 容器页面
          var container = '/kubernetes/' + cluster + '/' + namespace + '/' + row.name + '/container';
          var html = "<a href='" + container + "'>" + row.name + "</a>";
          return html;
        },
      },
      {
        "targets": 2, // 操作按钮目标列(从0开始)
        "render" : function (data, type, row) {
          if (row.status == 'Running') {
            var html = "<a class='text-success disabled' href='javascript:void(0);'>" + row.status + "</a>";
          } else if (row.status == 'ContainerCreating') {
            var html = "<a class='text-warning disabled' href='javascript:void(0);'>" + row.status + "</a>";
          } else {
            var html = "<a class='text-danger disabled' href='javascript:void(0);'>" + row.status + "</a>";
          }
          return html;
        },
      },
      {
        "targets": 6, // 操作按钮目标列(从0开始)
        "data": null,
        "render" : function (data, type, row) {
          var cluster = $('#cluster').val();
          var namespace = $('#namespace').val();
          // 登录容器
          var curl = '/kubernetes/' + cluster + '/' + namespace + '/' + row.name + '/' + data.containers + '/console';
          // 容器日志
          var lurl = '/kubernetes/' + cluster + '/' + namespace + '/' + row.name + '/' + data.containers + '/log';
          // 操作按钮
          var html = "<a class='btn btn-primary btn-xs btn_margin' target='_blank' href='" + curl + "'>远程登录</a>";
          html += "<a class='btn btn-info btn-xs btn_margin info_margin' href='" + lurl + "'>查看日志</a>";
          html += "<button type='button' id='pod_del' class='btn btn-danger btn-xs btn_margin info_margin'>销毁重建</button>";
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
}

$(function () {
  // 默认加载数据
  url = '/kubernetes/' + $('#cluster').val() + '/' + $('#namespace').val() + '/read_pods';
  Pod(url);
  // 根据集群加载默认数据
  $('#cluster').change(function () {
    url = '/kubernetes/' + $('#cluster').val() + '/' + $('#namespace').val() + '/read_pods';
    Pod(url);
  });
  // 根据命名空间加载默认数据
  $('#namespace').change(function () {
    url = '/kubernetes/' + $('#cluster').val() + '/' + $('#namespace').val() + '/read_pods';
    Pod(url);
  });
});

// pod delete
$('#pod_table').on('click', 'button#pod_del',function () {
  var cluster = $('#cluster').val();
  var namespace = $('#namespace').val();
  var data = $("#pod_table").DataTable().row( $(this).parents('tr') ).data();
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
          url: '/kubernetes/' + cluster + '/' + namespace + '/' + data.name + '/delete_pods',
          type: "post",
          data: {
            csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
          },
          success: function (result) {
            if (result) {
              bootbox.alert("<h5 class='text-center'>容器已成功销毁重建!</h5>", function(){ window.location.reload(); });
            } else {
              return
            }
          }
        });
      }
    }
  });
});

// Pod container table
$(function () {
  console.log($('#cluster').val());
  var path = GetCurl();
  $('#container_table').DataTable({
    "ajax": {
      url:  window.location.pathname,
      type: "post",
      dataType: "json",
      dataSrc: ''
    },
    "columns": [
      {"data": "name"},
      {"data": "container_id"},
      {"data": "status"},
      {"data": "image"}
    ],
    "columnDefs" : [
      {
        "targets": 4, // 操作按钮目标列(从0开始)
        "data": null,
        "render" : function (data, type, row) {
          // 远程登录
          var curl = '/kubernetes/' + path[1] + '/' + path[2] + '/' + path[3] + '/' + data.name + '/console';
          // 容器日志
          var lurl = '/kubernetes/' + path[1] + '/' + path[2] + '/' + path[3] + '/' + data.name + '/log';
          var html = "<a class='btn btn-primary btn-xs btn_margin' href='" + curl + "'>远程登录</a>";
          html += "<a class='btn btn-info btn-xs btn_margin info_margin' href='" + lurl + "'>查看日志</a>";
          return html;
        },
      },
      {
        "targets": 2, // 操作按钮目标列(从0开始)
        "render" : function (data, type, row) {
          if (row.status == 'Running') {
            var html = "<a class='btn btn-success btn-xs disabled btn_margin' href='javascript:void(0);'>" + row.status + "</a>";
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


