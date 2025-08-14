from django.contrib import admin
from .models.regionalizacao import SubPrefeitura, Distrito
from .models.estrutura_administrativa import Orgao, Prefeito
from .models.vinculos_externos.ods import ODS
from .models.vinculos_externos.planos_setoriais import PlanoSetorial
# Register your models here.

admin.site.register(SubPrefeitura)
admin.site.register(Distrito)
admin.site.register(Orgao)
admin.site.register(Prefeito)
admin.site.register(ODS)
admin.site.register(PlanoSetorial)