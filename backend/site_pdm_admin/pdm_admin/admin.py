from django.contrib import admin
from .models.regionalizacao.divisoes_administrativas import SubPrefeitura, Distrito
# Register your models here.

admin.site.register(SubPrefeitura)
admin.site.register(Distrito)
