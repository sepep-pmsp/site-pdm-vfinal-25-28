from django.contrib import admin
from .models.regionalizacao import SubPrefeitura, Distrito
from .models.estrutura_administrativa import Orgao, Prefeito
# Register your models here.

admin.site.register(SubPrefeitura)
admin.site.register(Distrito)
admin.site.register(Orgao)
admin.site.register(Prefeito)