// 集群节点
function cluster(url, data){
  $('#node_table').DataTable({
    "ajax": {
      url: url,
      type: "post",
      dataType: "json",
      dataSrc: '',
      data: data,
    },
    "columns": [
      {"data": "name"},
      {"data": "status"},
      {"data": "ip"},
      {"data": "version"},
      {"data": "resource"},
      {"data": "os"},
      {"data": "kernel"},
    ],
    "columnDefs" : [
      {
        "targets": 7, // 操作按钮目标列(从0开始)
        "data": null,
        "render" : function (data, type, row) {
          var html = "<button type='button' id='node_del' class='btn btn-danger btn-xs btn_margin'>删除</button>";
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
  url = '/kubernetes/read_nodes';
  data = {name: $('#cluster').val()};
  cluster(url, data);
  // 选择集群名称
  $('#cluster').change(function () {
    data = {name: $(this).val()};
    cluster(url, data);
  });
});
