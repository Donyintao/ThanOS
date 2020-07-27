$(function () {
  // 全选
  $('.check-all').on('ifChecked', function(event){
    $('input').iCheck('check');
    // 显示删除按钮
    $('.check-initial').css('display', 'initial');
  });
  
  // 反选
  $('.check-all').on('ifUnchecked', function(event) {
    $('input').iCheck('uncheck');
    // 隐藏删除按钮
    $('.check-initial').css('display', 'none');
  });
  
  // datatables默认不刷新请求页面，在请求第二页的时候出现多选框样式问题，解决办法如下:
  $('.checkchild').iCheck({
    handle: 'checkbox',
    checkboxClass: 'icheckbox_flat-green'
  });
});

// 批量删除用户
$(function () {
  $('.del_checkall').click(function () {
    var ids = [];
    // 获取选中的值(批量)
    $('input[name="optionName"]:checked').each(function() {
      ids.push($(this).val());
    });
    console.log(ids);
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
            url: '/users/users_delete',
            type: "post",
            dataType: "json",
            data: {
              ids: ids,
              csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
            },
            traditional: true,
            success: function (result) {
              if (result) {
                bootbox.alert("<h4 class='text-center'>数据已成功删除!</h4>", function(){ window.location.reload(); });
              } else {
                return
              }
            }
          });
        }
      }
    });
  });
});