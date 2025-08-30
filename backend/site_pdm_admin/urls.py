"""
URL configuration for site_pdm_admin project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from pdm_api.api.main import api as pdm_api
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

# Adiciona um prefixo de URL para todas as rotas da sua aplicação.
# Isso garante que o Django consiga lidar com o prefixo '/backend'
# que o Traefik está enviando.
urlpatterns = [
    re_path(r'^backend/', include([
        path('admin/', admin.site.urls),
        path('api/', pdm_api.urls),
        path("_nested_admin/", include("nested_admin.urls")),
    ])),
    # Configuração de arquivos estáticos e de mídia no nível superior,
    # para serem acessados pelo Traefik sem o prefixo '/backend'.
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]
