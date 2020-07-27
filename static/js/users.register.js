// 注册用户
$(function () {
  $('#add_userForm').bootstrapValidator({
    message: 'This value is not valid',
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '账号不能为空, 请输入账号.'
          },
          remote: {
            type: 'POST',
            url: '/users/register_check',
            data: {username: $('#username').val()},
            delay :  1000,
            message: '当前账号已存在, 请重新输入账号.'
          }
        }
      },
      nickname: {
        validators: {
          notEmpty: {
            message: '中文名不能为空, 请输入用户名.'
          },
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空, 请输入密码.'
          },
          identical: {
            field: 'confirmPassword',
            message: '输入的密码与确认密码不一致.'
          }
        }
      },
      confirmPassword: {
          validators: {
              notEmpty: {
                  message: '确认密码不能为空, 请输入确认密码.'
              },
              identical: {
                  field: 'password',
                  message: '输入的密码与确认密码不一致.'
              }
          }
      }
    }
  });
  $('.add_userValid').click(function () {
    $('#add_userForm').bootstrapValidator('validate');
    if ($('#add_userForm').data("bootstrapValidator").isValid()) {
      $.ajax({
        url: '/users/register',
        type: "post",
        data: {
          username: $('#username').val(),
          nickname: $('#nickname').val(),
          password: $('#password').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result) {
            bootbox.alert("<h5 class='text-center'>用户添加成功!</h5>", function(){ self.location='/users/users'; });
          } else {
            return
          }
        }
      });
    }
  });
  $('.add_userReset').click(function () {
    $('#add_userForm').data('bootstrapValidator').resetForm(true);
  });
});

// 删除用户
$(function () {
  $('.del_user').click(function () {
    var id = $(this).attr('CurlId');
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
            data: {
              id: id,
              csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
            },
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

// 编辑用户
$(function () {
  $('#role_select').on('hidden.bs.select', function (e) {
    var NewList = $('#role_select').val();
    console.log(NewList);
    if (NewList != null) {
      $('#roles').val(NewList);
    } else {
      $('#roles').val("");
    }
  });
  $('#edit_userForm').bootstrapValidator({
    message: 'This value is not valid',
    excluded: [':disabled', ':hidden', ':not(:visible)'],
    fields: {
      phone: {
        validators: {
          remote: {
            type: 'POST',
            url: '/users/phone_check',
            data: {id: $('#id').val(), phone: $('#phone').val()},
            delay :  1000,
            message: '当前手机号已存在, 请重新输入手机号.'
          }
        }
      },
      email: {
        validators: {
          remote: {
            type: 'POST',
            url: '/users/email_check',
            data: {id: $('#id').val(), email: $('#email').val()},
            delay :  1000,
            message: '当前邮箱地址已存在, 请重新输入邮箱地址.'
          }
        }
      },
      role_select: {
        validators: {
          notEmpty: {
            message: '角色不能为空, 请选择一个角色.'
          },
        }
      }
    }
  });
  
  $('.edit_userValid').click(function () {
    $('#edit_userForm').bootstrapValidator('validate');
    if ($('#edit_userForm').data("bootstrapValidator").isValid()) {
      $.ajax({
        url: '/users/users/' + $('#id').val() + '/change',
        type: "post",
        data: $("#edit_userForm").serialize() + 'csrfmiddlewaretoken:' + $("[name='csrfmiddlewaretoken']").val(),
        success: function (result) {
          if (result) {
            bootbox.alert("<h5 class='text-center'>用户修改成功!</h5>", function(){ self.location='/users/users'; });
          }
        }
      });
    }
  });
  $('.edit_userReset').click(function () {
    $('#edit_userForm').data('bootstrapValidator').resetForm(true);
  });
});

// 修改密码
$(function () {
  $('#edit_passwdForm').bootstrapValidator({
    message: 'This value is not valid',
    fields: {
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空, 请输入密码.'
          },
          identical: {
            field: 'confirmPassword',
            message: '输入的密码与确认密码不一致.'
          }
        }
      },
      confirmPassword: {
          validators: {
              notEmpty: {
                  message: '确认密码不能为空, 请输入确认密码.'
              },
              identical: {
                  field: 'password',
                  message: '输入的密码与确认密码不一致.'
              }
          }
      }
    }
  });
  $('.edit_passwdValid').click(function () {
    $('#edit_passwdForm').bootstrapValidator('validate');
    if ($('#edit_passwdForm').data("bootstrapValidator").isValid()) {
      $.ajax({
        url: '/users/users/' + $('#id').val() + '/password_change',
        type: "post",
        data: {
          id: $('#id').val(),
          password: $('#password').val(),
          csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
        },
        success: function (result) {
          if (result) {
            bootbox.alert("<h5 class='text-center'>密码修改成功, 请重新登录!</h5>", function(){ self.location='/users/login'; });
          } else {
            return
          }
        }
      });
    }
  });
  $('.edit_passwdReset').click(function () {
    $('#edit_passwdForm').data('bootstrapValidator').resetForm(true);
  });
});
