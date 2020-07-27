from django.urls import path
from . import views

urlpatterns = [
    path('list', views.domain, name='domain_list'),
    path('add', views.create_domain, name='create_domain'),
    path('valid', views.valid_domain, name='valid_domain'),
    path('query', views.query_domain, name='query_domain'),
    path('<slug:id>/change', views.change_domain, name='change_domain'),
    path('<slug:id>/delete', views.delete_domain, name='delete_domain'),
]

