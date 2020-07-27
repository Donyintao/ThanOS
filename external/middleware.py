#! /usr/bin/env python

# 作者: Dongyintao
# 时间: 2020-03-20 10:24

import re
from django.conf import settings
from django.shortcuts import redirect, HttpResponse
from django.utils.deprecation import MiddlewareMixin

class PermissionMiddleWare(MiddlewareMixin):
    def process_request(self, request):
        # 获取当前访问的URL路径
        current_path = request.path

        # 检查当前访问的URL路径是否在白名单中
        white_list = ["/users/login", "/users/logout", "/admin/.*"]
        for permissions in white_list:
            if re.match(permissions, current_path):
               return

        # 检查用户登录状态, 如果未登录跳转至登录页面
        if not request.session.get("username"):
            return redirect(settings.LOGIN_URL)

        # 检查当前访问的URL路径是否在权限列表中
        permissions_list = request.session['permissions_list']
        for permissions in permissions_list:
            permissions = '^%s$' % permissions
            result = re.search(permissions, current_path)
            if result:
                return
        return HttpResponse("无法访问，权限被拒绝!")
