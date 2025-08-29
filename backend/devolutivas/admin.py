from django.contrib import admin
from django.forms.models import BaseInlineFormSet
from django.core.exceptions import ValidationError
from devolutivas.models.canal import Canal
from devolutivas.models.temas import Tema
from devolutivas.models.contribuicao import Contribuicao, ContribuicaoSubPrefeitura
from devolutivas.models.devolutiva import Devolutiva
from devolutivas.models.secao import SecaoParticipacao, SubSecaoApresentacao, ParagrafoApresentacao, LinkYoutubeAudiencia
from cadastros_basicos.models.estrutura_administrativa import Orgao


admin.site.register(Canal)
admin.site.register(Tema)
admin.site.register(LinkYoutubeAudiencia)

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


class ParagrafoApresentacaoInline(admin.TabularInline):
    model = ParagrafoApresentacao
    extra = 1
    verbose_name = "Parágrafo de Apresentação"
    verbose_name_plural = "Parágrafos de Apresentação"

@admin.register(SubSecaoApresentacao)
class SubSecaoApresentacaoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'subtitulo')
    inlines = [ParagrafoApresentacaoInline]

class SubSecaoApresentacaoInline(admin.StackedInline):
    model = SubSecaoApresentacao
    extra = 0
    max_num = 1
    verbose_name = "Modal de Apresentação"
    verbose_name_plural = "Modal de Apresentação"
    inlines = [ParagrafoApresentacaoInline]

@admin.register(SecaoParticipacao)
class SecaoParticipacaoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'subtitulo')
    search_fields = ('titulo', 'subtitulo', 'texto', 'subtitulo_box', 'texto_box')
    inlines = [SubSecaoApresentacaoInline]
