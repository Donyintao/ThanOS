// 添加域名
$(function () {
  $('#add_dnsFrom').bootstrapValidator({
    message: 'This value is not valid',
    fields: {
      host: {
        validators: {
          notEmpty: {
            message: '主机记录不能为空, 请输入主机记录.'
          },
          remote: {
            type: 'POST',
            url: '/domain/valid',
            data: { host: $('#host').val() },
            delay :  1000,
            message: '主机记录已存在, 请重新输入.'
          }
        }
      },
      data: {
        validators: {
          notEmpty: {
            message: '解析地址不能为空, 请输入解析地址.'
          },
          regexp: {
            regexp: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
            message: '请输入正确的IPV4网段，格式: XX.XX.XX.XX.'
          },
        }
      },
    }
  });
  $('.add_dnsValid').click(function () {
    if ($('#add_dnsFrom').data("bootstrapValidator").isValid()) {
      $.ajax({
        url: '/domain/add',
        type: "post",
        data: {
          host: $('#host').val(),
          zone: $('#zone').val(),
          type: $('#type').val(),
          data: $('#data').val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据添加成功!</h5>", function(){
              self.location='/domain/list';
            });
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
  $('.add_dnsReset').click(function () {
    $('#add_dnsFrom').data('bootstrapValidator').resetForm(true);
  });
});

// 更新域名
$(function () {
  console.log()
  $('#up_dnsForm').bootstrapValidator({
    message: 'This value is not valid',
    fields: {
      host: {
        validators: {
          notEmpty: {
            message: '主机记录不能为空, 请输入主机记录.'
          },
          remote: {
            type: 'POST',
            url: '/domain/valid',
            data: { host: $('#host').val(), oldhost: $('#oldhost').val() },
            delay :  1000,
            message: '主机记录已存在, 请重新输入.'
          },
        }
      },
      data: {
        validators: {
          notEmpty: {
            message: '解析地址不能为空, 请输入解析地址.'
          },
          regexp: {
            regexp: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
            message: '请输入正确的IPV4网段，格式: XX.XX.XX.XX.'
          },
        }
      },
    }
  });
  $('.up_dnsValid').click(function () {
    $('#up_dnsForm').bootstrapValidator('validate');
    if ($('#up_dnsForm').data("bootstrapValidator").isValid()){
      $.ajax({
        url: window.location.pathname,
        type: "post",
        data: {
          host: $('#host').val(),
          zone: $('#zone').val(),
          type: $('#type').val(),
          data: $('#data').val(),
          oldhost: $('#oldhost').val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据更新成功!</h5>", function(){
              self.location='/domain/list';
            });
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
  $('.up_dnsReset').click(function () {
    $('#up_dnsForm').data('bootstrapValidator').resetForm(true);
  });
});

// 删除域名
$(function () {
  $('.del_dns').click(function () {
    var id = $(this).attr('CurlId')
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
            url: '/domain/' + id + '/delete',
            type: "post",
            data: {
              id: id,
            },
            success: function (result) {
              if (result) {
                bootbox.alert("<h5 class='text-center'>数据已成功删除!</h5>", function(){ window.location.reload(); });
              } else {
                bootbox.alert(result);
              }
            },
            error: function (result) {
              bootbox.alert(result);
            }
          });
        }
      }
    });
  });
});