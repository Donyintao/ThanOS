// 集群-命名空间联动菜单(表单选择时用)
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
  $("#namespace option:gt(0)").remove();
  $.ajax({
    url: "/kubernetes/" + $('#cluster').val() + "/read_namespaces",
    type: "post",
    async: false,
    success: function (result) {
      var result = $.parseJSON(result);
      for (var i = 0; i < result.length; i++) {
        var namespace = result[i].name;
        $("#namespace option[index='0']").remove();
        if (namespace == 'default') {
          $("#namespace").append("<option value=" + namespace + " selected" + ">" + "空间: " + namespace + "</option>");
        } else {
          $("#namespace").append("<option value=" + namespace + ">" + "空间: " + namespace + "</option>");
        }
      }
      // 调用刷新实例后触发此事件
      $('#namespace').selectpicker('refresh');
      // 渲染实例被调用后触发此事件
      $('#namespace').selectpicker('render');
    }
  });
  $('#cluster').change(function () {
    $("#namespace option:gt(0)").remove();
    $.ajax({
      url: "/kubernetes/" + $('#cluster').val() + "/read_namespaces",
      type: "post",
      async: false,
      success: function (result) {
        var result = $.parseJSON(result);
        for (var i = 0; i < result.length; i++) {
          var namespace = result[i].name;
          $("#namespace option[index='0']").remove();
          if (namespace == 'default') {
            $("#namespace").append("<option value=" + namespace + " selected" + ">" + "空间: " + namespace + "</option>");
          } else {
            $("#namespace").append("<option value=" + namespace + ">" + "空间: " + namespace + "</option>");
          }
        }
        // 调用刷新实例后触发此事件
        $('#namespace').selectpicker('refresh');
        // 渲染实例被调用后触发此事件
        $('#namespace').selectpicker('render');
      }
    });
  });
});