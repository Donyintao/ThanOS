from django.contrib import admin
from Users import models
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

class MyUserAdmin(UserAdmin):
    def __init__(self, *args, **kwargs):
        super(MyUserAdmin, self).__init__(*args, **kwargs)
        self.list_display = (
            'username', 'nickname', 'email', 'is_active', 'is_staff', 'is_superuser', 'department')
        self.search_fields = ('username', 'email', 'nickname')

    def changelist_view(self, request, extra_context=None):
        if not request.user.is_superuser:
            self.fieldsets = ((None, {'fields': ('username', 'password',)}),
                              (_('Personal info'), {'fields': ('nickname', 'email', 'department')}),
                              (_('Permissions'), {'fields': ('is_active', 'is_staff', 'role')}),
                              (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
                              )
            self.add_fieldsets = ((None, {'classes': ('wide',),
                                          'fields': ('username', 'nickname', 'password1', 'password2', 'email',
                                                     'department', 'is_active', 'is_staff', 'role'),
                                          }),
                                  )
        else:
            self.fieldsets = ((None, {'fields': ('username', 'password',)}),
                              (_('Personal info'), {'fields': ('nickname', 'email', 'department')}),
                              (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'role')}),
                              (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
                              )
            self.add_fieldsets = ((None, {'classes': ('wide',),
                                          'fields': ('username', 'nickname', 'password1', 'password2', 'email',
                                                    'department', 'is_active', 'is_staff', 'is_superuser',
                                                     'role'),
                                          }),
                                  )
        return super(MyUserAdmin, self).changelist_view(request, extra_context)

admin.site.register(models.MyUsers, MyUserAdmin)

class PermissionAdmin(admin.ModelAdmin):
    list_display = ["title", "url", "menu"]

admin.site.register(models.Menu)
admin.site.register(models.Role)
admin.site.register(models.Permission, PermissionAdmin)
