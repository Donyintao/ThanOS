from django.db import models
from django.contrib.auth.models import AbstractUser, Group

class MyUsers(AbstractUser):
    nickname = models.CharField(u'中文名', max_length=64, blank=False, null=False)
    department = models.CharField(u'部门', max_length=64, blank=True, null=True)
    role = models.ManyToManyField('Role', related_name='users_role', verbose_name="角色")

    def __unicode__(self):
        return self.username

    def __str__(self):
        return self.username

    class Meta:
        db_table = 'users'
        verbose_name = u'用户'
        verbose_name_plural = u"用户"

class Menu(models.Model):
    '''菜单表'''
    title = models.CharField(u'菜单', max_length=32, blank=False, null=False, unique=True)
    icon = models.CharField(u'图标', max_length=32, blank=True, null=True)

    def __unicode__(self):
        return self.title

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'menu'
        verbose_name = u'菜单'
        verbose_name_plural = u'菜单'

class Role(models.Model):
    '''角色表'''
    title = models.CharField(u'角色名称', max_length=32, blank=False, null=False, unique=True)
    permissions = models.ManyToManyField("Permission", verbose_name="权限", related_name='role_permission')

    def __unicode__(self):
        return self.title

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'role'
        verbose_name = u'角色'
        verbose_name_plural = u'角色'

class Permission(models.Model):
    '''权限表'''
    title = models.CharField(u'标题', max_length=32)
    url = models.CharField(u'URL', max_length=255)
    menu = models.ForeignKey("Menu", verbose_name="菜单", related_name='permission_menu', on_delete=models.CASCADE)

    def __unicode__(self):
        return self.title

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'permissions'
        verbose_name = u'权限'
        verbose_name_plural = u'权限'