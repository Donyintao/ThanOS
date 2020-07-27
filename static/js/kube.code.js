//
$(function () {
  $('.btn_plan1').click(function () {
    var id = $(this).attr('CurlId');
    bootbox.confirm({
      title: "提示内容:",
      message: "在重新审核之前，请确认问题已经解决.",
      buttons: {
        cancel: {
          label: '取消',
          className: 'btn-danger'
        },
        confirm: {
            label: '确认',
            className: 'btn-info'
        }
      },
      callback: function (result) {
        if (result) {
          $.ajax({
            url: '/kubernetes/audit_release',
            type: "post",
            data: {
              id: id,
              // 状态0: 表示审核中(默认状态)
              status: 0,
            },
            success: function (result) {
              if (result) {
                bootbox.alert("<h5 class='text-center'>审核通道已重新启动，请联系相关人员重新审核!</h5>", function(){ window.location.reload(); });
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

// 发布审核
$(function () {
  $('.btn_plan2').click(function () {
    var id = $(this).attr('CurlId');
    bootbox.dialog({
      title: '提示内容:',
      message: "<p>点击审核通过之前，请确认当前发布版本是否已经通过测试？</p>",
      buttons: {
        cancel: {
          label: "审核拒绝",
          className: 'btn-danger',
          callback: function(result){
            if (result) {
              $.ajax({
                url: '/kubernetes/audit_release',
                type: "post",
                data: {
                  id: id,
                  // 状态1: 表示拒绝
                  status: 1,
                },
                success: function (result) {
                  if (result) {
                    bootbox.alert(
                      "<h5 class='text-center'>发布审核被拒绝，请联系项目负责人了解详细原因!</h5>",
                      function () {
                        window.location.reload();
                      });
                  }
                }
              })
            }
          }
        },
        approval: {
          label: "审核通过",
          className: 'btn-info',
          callback: function(result){
            if (result) {
              $.ajax({
                url: '/kubernetes/audit_release',
                type: "post",
                data: {
                  id: id,
                  // 状态2: 表示已通过
                  status: 2,
                },
                success: function (result) {
                  if (result) {
                    bootbox.alert(
                      "<h5 class='text-center'>发布审核已通过，请点击详情后，执行发布上线!</h5>",
                      function(){ window.location.reload(); });
                  }
                }
              });
            }
          }
        }
      }
    });
  });
});

// 添加应用
$(function () {
  // bootStrapValidator校验
  $('#add_codeForm').bootstrapValidator({
    message: 'This value is not valid',
    fields: {
      code: {
        validators: {
          notEmpty: {
            message: '应用名称不能为空, 请重新输入应用名称.'
          },
        }
      },
    }
  });
  $('.add_codeValid').click(function () {
    $('#add_codeForm').bootstrapValidator('validate');
    if ($('#add_codeForm').data("bootstrapValidator").isValid()) {
      $.ajax({
        url: '/kubernetes/create_code',
        type: "post",
        data: {
          clusters: $('#clusters').val(),
          namespaces: $('#namespaces').val(),
          type: $('#type').val(),
          code: $('#code').val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert("<h5 class='text-center'>数据添加成功!</h5>", function(){ self.location='/kubernetes/code_list'; });
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
  $('.add_codeReset').click(function () {
    $('#add_codeForm').data('bootstrapValidator').resetForm(true);
  });
});

// 添加发布计划
$(function () {
  // bootStrapValidator校验
  $('#add_resForm').bootstrapValidator({
    message: 'This value is not valid',
    fields: {
      code: {
        validators: {
          notEmpty: {
            message: '应用名称不能为空, 请重新输入应用名称.'
          },
        }
      },
      version: {
        validators: {
          notEmpty: {
            message: '应用版本不能为空, 请重新输入应用版本.'
          },
        }
      },
    }
  });
  $('.add_resValid').click(function () {
    $('#add_resForm').bootstrapValidator('validate');
    if ($('#add_resForm').data("bootstrapValidator").isValid()) {
      $.ajax({
        url: '/kubernetes/create_release',
        type: "post",
        data: {
          code: $('#code').val(),
          version: $('#version').val(),
        },
        success: function (result) {
          if (result == 'success') {
            bootbox.alert(
              "<h5 class='text-center'>数据添加成功!</h5>",
              function(){ self.location='/kubernetes/code_release'; });
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
  $('.add_codeReset').click(function () {
    $('#add_codeForm').data('bootstrapValidator').resetForm(true);
  });
});
