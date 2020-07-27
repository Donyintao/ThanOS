// 集群-命名空间联动菜单(添加应用时用)
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
          $("#clusters").append("<option value=" + name + " selected" + ">" + name + "</option>");
        } else {
          $("#clusters").append("<option value=" + name + ">" + name + "</option>");
        }
      }
      // 调用刷新实例后触发此事件
      $('#clusters').selectpicker('refresh');
      // 渲染实例被调用后触发此事件
      $('#clusters').selectpicker('render');
    }
  });
  $("#namespaces option:gt(0)").remove();
  $.ajax({
    url: "/kubernetes/" + $('#clusters').val() + "/read_namespaces",
    type: "post",
    async: false,
    success: function (result) {
      var result = $.parseJSON(result);
      for (var i = 0; i < result.length; i++) {
        var namespaces = result[i].name;
        $("#namespaces option[index='0']").remove();
        if (namespaces == 'default') {
          $("#namespaces").append("<option value=" + namespaces + " selected" + ">" + namespaces + "</option>");
        } else {
          $("#namespaces").append("<option value=" + namespaces + ">" + namespaces + "</option>");
        }
      }
      // 调用刷新实例后触发此事件
      $('#namespaces').selectpicker('refresh');
      // 渲染实例被调用后触发此事件
      $('#namespaces').selectpicker('render');
    }
  });
  $('#clusters').change(function () {
    $("#namespaces option:gt(0)").remove();
    $.ajax({
      url: "/kubernetes/" + $('#cluster').val() + "/read_namespaces",
      type: "post",
      async: false,
      success: function (result) {
        var result = $.parseJSON(result);
        for (var i = 0; i < result.length; i++) {
          var namespaces = result[i].name;
          $("#namespaces option[index='0']").remove();
          if (namespaces == 'default') {
            $("#namespaces").append("<option value=" + namespace + " selected" + ">" + namespace + "</option>");
          } else {
            $("#namespaces").append("<option value=" + namespace + ">" + namespace + "</option>");
          }
        }
        // 调用刷新实例后触发此事件
        $('#namespaces').selectpicker('refresh');
        // 渲染实例被调用后触发此事件
        $('#namespaces').selectpicker('render');
      }
    });
  });
});

// 应用类型下拉菜单
$(function () {
  var result = [
    {id: 1, name: "Deployment"},
    {id: 2, name: "DaemonSet"},
    {id: 3, name: "StatefulSet"},
  ];
  for (var i = 0; i < result.length; i++) {
    var id = result[i].id;
    var name = result[i].name;
    $("#type").append("<option value=" + name + ">" + name + "</option>");
  }
  // 调用刷新实例后触发此事件
  $('#type').selectpicker('refresh');
  // 渲染实例被调用后触发此事件
  $('#type').selectpicker('render');
});