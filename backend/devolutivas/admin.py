from django.contrib import admin
from django.forms.models import BaseInlineFormSet
from django.core.exceptions import ValidationError
from devolutivas.models.canal import Canal
from devolutivas.models.temas import Tema
from devolutivas.models.contribuicao import Contribuicao, ContribuicaoSubPrefeitura
from devolutivas.models.devolutiva import Devolutiva
from cadastros_basicos.models.estrutura_administrativa import Orgao


admin.site.register(Canal)
admin.site.register(Tema)

class ContribuicaoSubPrefeituraInline(admin.TabularInline):
    model = ContribuicaoSubPrefeitura
    extra = 1
    verbose_name = "Subprefeitura relacionada à Contribuição"
    verbose_name_plural = "Subprefeituras relacionadas às Contribuições"


class ContribuicaoDevolutivaInline(admin.TabularInline):
    model = Devolutiva
    extra = 1
    verbose_name = "Devolutiva relacionada à Contribuição"
    verbose_name_plural = "Devolutivas relacionadas às Contribuições"

@admin.register(Contribuicao)
class ContribuicaoAdmin(admin.ModelAdmin):
    list_display = ('id_contribuicao', 'origem', 'canal__nome', 'conteudo_truncated')
    search_fields = ('id_contribuicao', 'titulo', 'origem ', 'canal__nome', 'counteudo', 'titulo', 'resumo')
    inlines = [ContribuicaoSubPrefeituraInline, ContribuicaoDevolutivaInline]


@admin.register(Devolutiva)
class DevolutivaAdmin(admin.ModelAdmin):
    list_display = ('id', 'contribuicao__id_contribuicao', 'tema__nome', 'str_sigla_orgao', 'resposta_truncated')
    search_fields = ('contribuicao__id_contribuicao', 'tema__nome', 'resposta')
