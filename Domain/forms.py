from django import forms
from .models import Domain

class DomainValidForm(forms.Form):
    id = forms.IntegerField(required=False)
    zone = forms.IntegerField(required=False)
    host = forms.CharField(max_length=128, required=False)
    type = forms.CharField(max_length=128, required=False)
    data = forms.CharField(max_length=128, required=False)

class HostUpValidForm(forms.Form):
    host = forms.CharField(max_length=128, required=False)
    oldhost = forms.CharField(max_length=128, required=False)

    def clean(self):
        host = self.cleaned_data['host']
        oldhost = self.cleaned_data['oldhost']

        if Domain.objects.filter(host=host).exists():
            if host == oldhost:
                return host
            else:
                raise forms.ValidationError('主机记录已存在，请重新输入主机记录.')
        return host

class DomainDelValidForm(forms.Form):
    id = forms.IntegerField(required=False)

    def clean_id(self):
        id = self.cleaned_data['id']
        if Domain.objects.filter(id=id).exists():
            raise forms.ValidationError('删除失败, 请确认主机记录是否存在.')
        return id