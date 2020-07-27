#! /usr/bin/env python

import json
import etcd3
import django.utils.timezone as timezone
from Domain.forms import *
from Domain.models import Domain
from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.core.serializers.json import DjangoJSONEncoder

@csrf_exempt
def domain(request):
    if request.method == 'GET':
        result = Domain.objects.all()
        return render(request, 'domain/domain_list.html', {'result': result})

@csrf_exempt
def create_domain(request):
    if request.method == 'GET':
        dns_type = Domain.dns_type_choice
        dns_zone = Domain.dns_zone_choice
        return render(request, 'domain/domain_add.html', {'dns_zone': dns_zone, 'dns_type': dns_type})
    else:
        try:
            dns_form = DomainValidForm(request.POST)
            if dns_form.is_valid():
                zone = request.POST.get('zone')
                host = dns_form.cleaned_data['host']
                type = dns_form.cleaned_data['type']
                data = dns_form.cleaned_data['data']

                # 添加解析(数据库)
                AddObj = Domain.objects.create(zone=zone, host=host, type=type, data=data, ttl='60')

                # 添加解析(Etcd)
                etcd = etcd3.client(host='39.107.46.39', port=12379)
                # Etcd存储路径
                etcd_path = '/bind/named/named.linux-testing.com'
                # 获取DNS序列号(每次更新+1)
                number = etcd.get('/bind/named/named.linux-testing.com/serial/number')
                number = number[0].decode(encoding='utf-8')
                serial = int(number) + 1
                # 更新DNS序列号
                etcd.put(etcd_path + '/serial/number', str(serial))
                # 添加DNS域名
                record = '%-20s IN  A  %-2s' % (host, data)
                etcd.put(etcd_path + '/domain/' + host, record)

                return HttpResponse('success')
            else:
                dns_form = DomainValidForm()
        except Exception as err:
            return HttpResponse(err)

@csrf_exempt
def change_domain(request, id):
    if request.method == 'GET':
        result = Domain.objects.filter(id=id).values('id', 'zone', 'host', 'type', 'data', 'ttl')
        domain_type = Domain.dns_type_choice
        domain_zone = Domain.dns_zone_choice
        return render(request, 'domain/domain_change.html', {'result': result, 'domain_type': domain_type,
                                                             'domain_zone': domain_zone})
    else:
        dns_upform = DomainValidForm(request.POST)
        if dns_upform.is_valid():
            try:
                zone = request.POST.get('zone')
                host = dns_upform.cleaned_data['host']
                type = dns_upform.cleaned_data['type']
                data = dns_upform.cleaned_data['data']

                ### 更新数据(数据库)
                UpObj = Domain.objects.filter(id=id).update(zone=zone, host=host, type=type,
                                                            data=data, ttl='60', update_datetime=timezone.now())
                ### 更新解析(Etcd)
                etcd = etcd3.client(host='39.107.46.39', port=12379)
                # Etcd存储路径
                etcd_path = '/bind/named/named.linux-testing.com'
                domain_path = etcd_path + '/domain/'
                serial_path = etcd_path + '/serial/number'

                # 删除旧域名
                oldhost = request.POST.get('oldhost')
                etcd.delete(domain_path + oldhost)
                # 添加新域名
                record = '%-20s IN  A  %-2s' % (host, data)
                etcd.put(domain_path + host, record)

                # 获取DNS序列号(每次更新+1)
                number = etcd.get(serial_path)
                number = number[0].decode(encoding='utf-8')
                serial = int(number) + 1
                # 更新DNS序列号
                etcd.put(serial_path, str(serial))

                return HttpResponse('success')
            except Exception as err:
                return HttpResponse(err)
        else:
            dns_form = DomainValidForm()

@csrf_exempt
def delete_domain(request, id):
    if request.method == 'POST':
        dns_delform = DomainDelValidForm(request.POST)
        if dns_delform.is_valid():
            DelObj = Domain.objects.filter(id=id).delete()
            # 数据添加状态: true表示正常.
            return HttpResponse(json.dumps({'status': 'true'}))
        else:
            # 数据添加状态: false表示异常.
            return HttpResponse(json.dumps({'status': 'false'}))
    else:
        dns_delform = DomainDelValidForm()

@csrf_exempt
def query_domain(request):
    if request.method == 'POST':
        # 域名列表
        result = Domain.objects.all().values("id", "host", "zone", "type", "ttl", "data",
                                             "create_datetime", "update_datetime")
        # 将时间格式转化为json格式
        result = json.dumps(list(result), cls=DjangoJSONEncoder)
        return HttpResponse(result)

@csrf_exempt
def valid_domain(request):
    if request.method == 'POST':
        dns_form = HostUpValidForm(request.POST)
        if dns_form.is_valid():
            return HttpResponse(json.dumps({'valid': 'true'}))
        else:
            return HttpResponse(json.dumps({'valid': 'false'}))
    else:
        dns_form = DomainValidForm()