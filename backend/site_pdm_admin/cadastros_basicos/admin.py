from django.contrib import admin
from .models.regionalizacao import SubPrefeitura, Distrito
from .models.estrutura_administrativa.orgaos import Orgao
# Register your models here.

admin.site.register(SubPrefeitura)
admin.site.register(Distrito)
admin.site.register(Orgao)
