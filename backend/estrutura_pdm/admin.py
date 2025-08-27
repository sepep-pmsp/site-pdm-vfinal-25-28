from django.contrib import admin

from .models.eixos import Eixo, Tema
from .models.metas import Meta, MetaOrgao, MetaSubprefeitura, MetaZona, AcaoEstrategica, AcaoOrgao, MetaPlanoSetorial, MetaODS
from .models.pdm import PDM, DocumentoPDM, TipoDocumentoPDM
from cadastros_basicos.models.estrutura_administrativa import Orgao

# Register your models here.
admin.site.register(Tema)



class AcaoOrgaoInline(admin.TabularInline):
    model = AcaoOrgao
    extra = 1
    verbose_name = "Órgão Responsável"
    verbose_name_plural = "Órgãos Responsáveis"

@admin.register(AcaoEstrategica)
class AcaoEstrategicaAdmin(admin.ModelAdmin):
    list_display = ('numero', 'descricao', 'siglas_orgaos_responsaveis')
    search_fields = ('numero', 'descricao', 'siglas_orgaos_responsaveis')
    inlines = [AcaoOrgaoInline]

class EixoInline(admin.TabularInline):
    model = Tema
    extra = 1
    verbose_name = "Tema"
    verbose_name_plural = "Temas"

@admin.register(Eixo)
class EixoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'descricao', 'resumo')
    search_fields = ('nome', 'descricao')
    inlines = [EixoInline]

class AcaoEstrategicaInline(admin.TabularInline):
    model = AcaoEstrategica
    extra = 1
    verbose_name = "Ação Estratégica"
    verbose_name_plural = "Ações Estratégicas"

class MetaOrgaoInline(admin.TabularInline):
    model = MetaOrgao
    extra = 1
    verbose_name = "Órgão Responsável"
    verbose_name_plural = "Órgãos Responsáveis"

class MetaSubprefeituraInline(admin.TabularInline):
    model = MetaSubprefeitura
    extra = 1
    verbose_name = "Subprefeitura com Entregas"
    verbose_name_plural = "Subprefeituras com Entregas"

class MetaZonaInline(admin.TabularInline):
    model = MetaZona
    extra = 1
    verbose_name = "Zona com Entregas"
    verbose_name_plural = "Zonas com Entregas"

class MetaODSInline(admin.TabularInline):
    model = MetaODS
    extra = 1
    verbose_name = "ODS relacionado à Meta"
    verbose_name_plural = "ODS relacionados à Meta"

class MetaPlanoSetorialInline(admin.TabularInline):
    model = MetaPlanoSetorial
    extra = 1
    verbose_name = "Plano Setorial relacionado à Meta"
    verbose_name_plural = "Planos Setoriais relacionados à Meta"


@admin.register(Meta)
class MetaAdmin(admin.ModelAdmin):
    list_display = ('numero', 'destaque', 'descricao')
    search_fields = ('numero', 'destaque')
    inlines = [AcaoEstrategicaInline, 
                                            MetaOrgaoInline, 
                                            MetaSubprefeituraInline, MetaZonaInline, 
                                            MetaODSInline, MetaPlanoSetorialInline]


@admin.register(TipoDocumentoPDM)
class TipoDocumentoPDMAdmin(admin.ModelAdmin):
    list_display = ('nome', 'descricao')
    search_fields = ('nome',)
    ordering = ('nome',)

class TipoDocumentoPDMInline(admin.TabularInline):
    model = TipoDocumentoPDM
    extra = 1
    verbose_name = "Tipos de Documento do PDM"
    verbose_name_plural = "Tipos de Documentos do PDM"


@admin.register(DocumentoPDM)
class DocumentoPDMAdmin(admin.ModelAdmin):
    list_display = ('pdm', 'nome', 'ordem')
    search_fields = ('pdm__nome', 'nome')
    list_filter = ('pdm',)
    ordering = ('pdm', 'ordem')

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('pdm')


class PDMDocumentoInline(admin.TabularInline):
    model = DocumentoPDM
    extra = 1
    verbose_name = "Documento do PDM"
    verbose_name_plural = "Documentos do PDM"


@admin.register(PDM)
class PDMAdmin(admin.ModelAdmin):
    list_display = ('nome', 'ano_inicio', 'ano_fim', 'nome_prefeito')
    search_fields = ('nome', 'ano_inicio', 'ano_fim', 'nome_prefeito')
    inlines = [PDMDocumentoInline]

