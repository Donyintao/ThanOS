import json
import django.utils.timezone as timezone
from Users.models import MyUsers as Users
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect, HttpResponse

def index(request):
    return render(request, 'index.html')

'''用户登录'''
def login(request):
    message = '账号或密码错误, 请输入正确的账号和密码. 注意区分大小写.'
    if request.method == 'GET':
        return render(request, 'users/users_login.html')
    elif request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        users_login = authenticate(username=username, password=password)
        if users_login:
            # 校验成功, 保存用户状态信息
            request.session['is_login'] = True
            request.session["username"] = username

            # 查询当前登录账号的权限
            permissions = Users.objects.filter(username=username).values('role__permissions__url',
                                                                         'role__permissions__title',
                                                                         'role__permissions__menu__title',
                                                                         'role__permissions__menu__icon',
                                                                         'role__permissions__menu_id'
                                                                         ).distinct()
            permissions_list = []
            permissions_name = []
            permissions_menu = {}

            for item in permissions:
                # 登录账号的URL权限列表
                permissions_list.append(item['role__permissions__url'])
                # 登录账号的URL权限名称
                permissions_name.append(item['role__permissions__title'])
                # 登录账号的菜单权限列表
                menu_id = item['role__permissions__menu_id']
                if menu_id:
                    if menu_id not in permissions_menu:
                        permissions_menu[menu_id] = {
                            "menu": item['role__permissions__menu__title'],
                            "icon": item['role__permissions__menu__icon'],
                            "children": [
                                {
                                    "title": item['role__permissions__title'],
                                    "url": item['role__permissions__url'],
                                }
                            ],

                        }
                    else:
                        permissions_menu[menu_id]["children"].append({
                            "title": item['role__permissions__title'],
                            "url": item['role__permissions__url'],
                        })

            # 将当前登录账号的权限列表写入session
            request.session['permissions_list'] = permissions_list
            # 将当前登录账号的权限名称写入session
            request.session['permissions_name'] = permissions_name
            # 将当前登录账号的权限菜单写入session
            request.session['permissions_menu'] = permissions_menu
            return redirect("/")
        else:
            return HttpResponse(message)

"""注销登录"""
def logout(request):
    if request.method == 'GET':
        # 删除当前登录用户会话信息
        request.session.flush()
        return redirect("/users/login")
