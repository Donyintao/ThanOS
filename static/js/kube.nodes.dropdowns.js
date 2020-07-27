$(function () {
  $('.selectpicker').selectpicker({
    noneSelectedText: '请选择',
    liveSearch: 'true',
    actionsBox: 'true',
    liveSearchPlaceholder: 'Search'
  });
});

// 集群列表下拉菜单
$(function () {
  $.ajax({
    url: "/kubernetes/cluster_dropdown",
    type: "get",
    async: false,
    success: function (result) {
      var result = $.parseJSON(result);
      for (var i = 0; i < result.length; i++) {
        var id = result[i].id;
        var name = result[i].name;
        if (id == 1) {
          $("#cluster").append("<option value=" + name + " selected" + ">" + "集群: " + name + "</option>");
        } else {
          $("#cluster").append("<option value=" + name + ">" + "集群: " + name + "</option>");
        }
      }
      // 调用刷新实例后触发此事件
      $('#cluster').selectpicker('refresh');
      // 渲染实例被调用后触发此事件
      $('#cluster').selectpicker('render');
    }
  });
});