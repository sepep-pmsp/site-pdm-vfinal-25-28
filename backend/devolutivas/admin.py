from django.contrib import admin
from django.forms.models import BaseInlineFormSet
from django.core.exceptions import ValidationError
from devolutivas.models.canal import Canal
from devolutivas.models.temas import Tema
from devolutivas.models.contribuicao import Contribuicao, OrigensContribuicao, ContribuicaoSubPrefeitura
from devolutivas.models.devolutiva import Devolutiva, DevolutivaOrgao


admin.site.register(Canal)
admin.site.register(Tema)
admin.site.register(OrigensContribuicao)

class ContribuicaoSubPrefeituraInline(admin.TabularInline):
    model = ContribuicaoSubPrefeitura
    extra = 1
    verbose_name = "Subprefeitura relacionada à Contribuição"
    verbose_name_plural = "Subprefeituras relacionadas às Contribuições"


@admin.register(Contribuicao)
class ContribuicaoAdmin(admin.ModelAdmin):
    list_display = ('id_contribuicao', 'origem__nome', 'canal__nome', 'conteudo_truncated')
    search_fields = ('id_contribuicao', 'titulo', 'origem__nome ', 'canal__nome', 'counteudo', 'titulo', 'resumo')
    inlines = [ContribuicaoSubPrefeituraInline]


class DevolutivaOrgaoInlineFormSet(BaseInlineFormSet):
    def clean(self):
        super().clean()
        ativos = [
            f for f in self.forms
            if not f.cleaned_data.get('DELETE', False)
            and f.cleaned_data.get('orgao')
        ]
        if len(ativos) < 1:
            raise ValidationError("Inclua ao menos um Órgão responsável.")

class DevolutivaOrgaoInline(admin.TabularInline):
    model = DevolutivaOrgao
    extra = 1
    formset = DevolutivaOrgaoInlineFormSet
    min_num = 1 
    validate_min = True
    verbose_name = "Órgão Responsável pela Devolutiva"
    verbose_name_plural = "Órgãos Responsáveis pelas Devolutivas"

@admin.register(Devolutiva)
class DevolutivaAdmin(admin.ModelAdmin):
    list_display = ('id', 'contribuicao__id_contribuicao', 'tema__nome', 'str_siglas_orgaos_responsaveis', 'resposta_truncated')
    search_fields = ('contribuicao__id_contribuicao', 'tema__nome', 'resposta')
    inlines = [DevolutivaOrgaoInline]