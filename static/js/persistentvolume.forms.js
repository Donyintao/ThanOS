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
  $('#pv_table').DataTable({
    "ajax": {
      url: url,
      type: "GET",
      dataType: "json",
      dataSrc: '',
      data: data
    },
    "columns": [
      {"data": "name"},
      {"data": "capacity" },
      {"data": "access_modes"},
      {"data": "reclaim_policy"},
      {"data": "status"},
      {"data": "storage_class"},
      {"data": "claim_ref"},
      {"data": "create_time"},
    ],
    "columnDefs" : [
      {
        "targets": 8, // 操作按钮目标列(从0开始)
        "data": null,
        "render" : function (data, type, row) {
          // 编辑页面
          var yaml = '/kubernetes/change_persistentvolume?resource=' + row.name;
          // 操作按钮
          html = "<a class='btn btn-warning btn-xs btn_margin info_margin' href='" + yaml + "'>更新YAML</a>";
          html += "<button type='button' id='pv_del' class='btn btn-danger btn-xs btn_margin info_margin'>删除</button>";
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
  url = '/kubernetes/read_persistentvolume';
  initialization(url, '');
});

// persistentvolume delete
$('#pv_table').on('click', 'button#pv_del',function () {
  var data = $("#pv_table").DataTable().row( $(this).parents('tr') ).data();
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
          url: '/kubernetes/delete_persistentvolume',
          type: "post",
          data: {
            name: data.name,
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
