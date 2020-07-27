// 命名空间
function namespace(url){
  // 隐藏错误，在控制台打印
  $.fn.dataTable.ext.errMode = 'none';
  
  $('#ns_table').on('error.dt', function(e, settings, techNote, message) {
     console.log( 'An error has been reported by DataTables: ', message );
  });
  $('#ns_table').DataTable({
    "ajax": {
      url: url,
      type: "POST",
      dataType: "json",
      dataSrc: ''
    },
    "columns": [
      {"data": "name"},
      {"data": "status"},
      {"data": "create_time"},
    ],
    "columnDefs" : [
      {
        "targets": 1, // 操作按钮目标列(从0开始)
        "data": null,
        "render" : function (data, type, row) {
          if (row.status == 'Active') {
            var html = "<a class='btn btn-success btn-xs disabled btn_margin' href='javascript:void(0);'>" + row.status + "</a>";
          } else {
            var html = "<a class='btn btn-warning btn-xs disabled btn_margin' href='javascript:void(0);'>" + row.status + "</a>";
          }
          
          return html;
        },
      },
      {
        "targets": 3, // 操作按钮目标列(从0开始)
        "data": null,
        "render" : function (data, type, row) {
          var html = "<button type='button' id='ns_del' class='btn btn-danger btn-xs btn_margin'>删除</button>";
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
  url = '/kubernetes/' + $('#cluster').val()  + '/read_namespaces';
  namespace(url);
  // 选择集群名称
  $('#cluster').change(function () {
    url = '/kubernetes/' + $('#cluster').val()  + '/read_namespaces';
    namespace(url);
  });
});

// 添加命名空间
$(function () {
  // bootStrapValidator校验
  $('#add_nsForm').bootstrapValidator({
    message: 'This value is not valid',
    fields: {
      namespace: {
        validators: {
          notEmpty: {
            message: '命名空间名称不能为空, 请重新输入命名空间名称.'
          },
        }
      },
    }
  });
  $('.add_nsValid').click(function () {
    $('#add_nsForm').bootstrapValidator('validate');
    if ($('#add_nsForm').data("bootstrapValidator").isValid()) {
      $.ajax({
        url: '/kubernetes/create_namespaces',
        type: "post",
        data: {name: $('#cluster').val(), namespace: $('#namespace').val()},
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据添加成功!</h5>", function(){ self.location='/kubernetes/namespaces'; });
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
  $('.add_nsReset').click(function () {
    $('#add_nsForm').data('bootstrapValidator').resetForm(true);
  });
});

// 删除命名空间
$('#ns_table').on('click', 'button#ns_del',function () {
  var data = $("#ns_table").DataTable().row( $(this).parents('tr') ).data();
  bootbox.confirm({
    title: "提示内容:",
    message: "删除操作是不可恢复的，你确认要删除吗？",
    buttons: {
      cancel: {
        label: '<i class="fa fa-times"></i> 取消',
        className: 'btn-danger'
      },
      confirm: {
          label: '<i class="fa fa-"></i> 确认',
          className: 'btn-primary'
      }
    },
    callback: function (result) {
      if (result) {
        $.ajax({
          url: '/kubernetes/delete_namespaces',
          type: "post",
          data: {
            name: $('#cluster').val(),
            namespace: data.name,
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



