# Generated by Django 2.2.10 on 2020-07-18 20:12

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Domain',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('zone', models.IntegerField(choices=[(0, 'linux-testing.com')], default=0, verbose_name='Zone')),
                ('host', models.CharField(max_length=128, unique=True, verbose_name='记录名称')),
                ('type', models.CharField(choices=[('A', 'A- 将域名指向一个IPV4地址'), ('CNAME', 'CNAME- 将域名指向另外一个域名'), ('AAAA', 'AAAA- 将域名指向一个IPV6地址')], default='A', max_length=128, verbose_name='记录类型')),
                ('data', models.CharField(max_length=128, verbose_name='记录值')),
                ('ttl', models.IntegerField(verbose_name='TTL时间')),
                ('mx_priority', models.IntegerField(blank=True, null=True, verbose_name='MX优先级')),
                ('refresh', models.IntegerField(blank=True, null=True, verbose_name='刷新时间间隔')),
                ('retry', models.IntegerField(blank=True, null=True, verbose_name='重试时间间隔')),
                ('expire', models.IntegerField(blank=True, null=True, verbose_name='过期时间')),
                ('minimum', models.IntegerField(blank=True, null=True, verbose_name='最小时间')),
                ('serial', models.IntegerField(blank=True, null=True, verbose_name='序列号')),
                ('resp_person', models.CharField(blank=True, max_length=128, null=True, verbose_name='责任人')),
                ('status', models.BooleanField(default=1, verbose_name='记录状态')),
                ('create_datetime', models.DateTimeField(default=django.utils.timezone.now, verbose_name='创建时间')),
                ('update_datetime', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
            ],
            options={
                'db_table': 'dns_records',
            },
        ),
    ]
