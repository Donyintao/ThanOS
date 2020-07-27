// Service数据初始化
function service(url){
  // 隐藏错误，在控制台打印
  $.fn.dataTable.ext.errMode = 'none';
  
  $('#deployment_table').on('error.dt', function(e, settings, techNote, message) {
     console.log( 'An error has been reported by DataTables: ', message );
  });
  
  $('#service_table').DataTable({
    "ajax": {
      url: url,
      type: "POST",
      dataType: "json",
      dataSrc: ''
    },
    "columns": [
      {"data": "name"},
      {"data": "type" },
      {"data": "ip"},
      {"data": "port"},
    ],
    "columnDefs" : [
      {
        "targets": 4, // 操作按钮目标列(从0开始)
        "data": null,
        "render" : function (data, type, row) {
          var cluster = $('#cluster').val();
          var namespace = $('#namespace').val();
          // 编辑页面
          var yaml = '/kubernetes/' + cluster + '/' + namespace + '/' + row.name + '/change_service';
          // 操作按钮
          var html = "<a class='btn btn-warning btn-xs btn_margin info_margin' href='" + yaml + "'>更新YAML</a>";
          html += "<button type='button' id='svc_del' class='btn btn-danger btn-xs btn_margin info_margin'>删除</button>";
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
  url = '/kubernetes/' + $('#cluster').val() + '/' + $('#namespace').val() + '/read_service';
  service(url);
  // 根据集群加载默认数据
  $('#cluster').change(function () {
    url = '/kubernetes/' + $('#cluster').val() + '/' + $('#namespace').val() + '/read_service';
    service(url);
  });
  // 根据命名空间加载默认数据
  $('#namespace').change(function () {
    url = '/kubernetes/' + $('#cluster').val() + '/' + $('#namespace').val() + '/read_service';
    service(url);
  });
});

// delete service
$('#service_table').on('click', 'button#svc_del',function () {
  var data = $("#service_table").DataTable().row( $(this).parents('tr') ).data();
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
          url: '/kubernetes/' + cluster + '/' + namespace + '/' + data.name + '/delete_service',
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