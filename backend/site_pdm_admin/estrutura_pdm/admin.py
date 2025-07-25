from django.contrib import admin

from .models.eixos import Eixo, Tema
from .models.metas import Meta, MetaOrgao, AcaoEstrategica, MetaSubprefeitura
from cadastros_basicos.models.estrutura_administrativa import Orgao

# Register your models here.
admin.site.register(Tema)
admin.site.register(AcaoEstrategica)

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

@admin.register(Meta)
class MetaAdmin(admin.ModelAdmin):
    list_display = ('numero', 'destaque', 'descricao')
    search_fields = ('numero', 'destaque')
    inlines = [AcaoEstrategicaInline, MetaOrgaoInline, MetaSubprefeituraInline]

