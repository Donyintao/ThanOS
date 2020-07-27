$(function () {
  $('.selectpicker').selectpicker({
    noneSelectedText: '请选择',
    liveSearch: 'true',
    actionsBox: 'true',
    liveSearchPlaceholder: 'Search'
  });
});

// 角色列表下拉菜单
$(function () {
  $.get("/users/role_dropdown", function (result) {
    // 获取所有角色列表
    var result = $.parseJSON(result);
    console.log(result);
    // 获取当前用户角色列表
    var role_array = $.parseJSON($('#roleinfo').val());
    console.log(role_array);
    // 默认的角色列表
    var array = [];
    
    for (var k = 0; k < result.length; k++) {
      var kid = result[k].id;
      for (var y = 0; y < role_array.length; y++) {
        var yid = role_array[y].roles__id;
        
        if (kid == yid) {
          array.push(yid);
        }
      }
    }
    // 选取角色的默认值
    for (var j = 0; j < array.length; j++) {
      var id = array[j];
      if (j == array.length -1) {
        $("#roles").val($("#roles").val() + "" + id  );
      } else  {
        $("#roles").val($("#roles").val() + "" + id +  "," );
      }
    }
    // 默认菜单
    for (var i = 0; i < result.length; i++) {
      var id = result[i].id;
      var title = result[i].title;

      $("#role_select").append("<option value=" + id + ">" + title + "</option>");
      // 默认选择值
      $("#role_select").selectpicker('val', array);
      // 调用刷新实例后触发此事件
      $('#role_select').selectpicker('refresh');
      // 渲染实例被调用后触发此事件
      $('#role_select').selectpicker('render');
    }
  });
});