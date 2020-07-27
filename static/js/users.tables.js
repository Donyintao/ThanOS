$(function () {
  $('#UserTable').DataTable({
    "bLengthChange": false,
    "bFilter": true,
    "bInfo": false,
    "bAutoWidth": false,
    "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 0 ] }],
    "aaSorting": [[1, "asc"]],
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
