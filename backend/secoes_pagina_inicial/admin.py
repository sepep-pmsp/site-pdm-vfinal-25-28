import nested_admin
from django.contrib import admin, messages
from .models import (AboutPDM, ParagrafoAbout, CartaPrefeito, ParagrafoCartaPrefeito, 
                     Noticia,
                     Historico, CardHistorico,
                     SecaoTransparencia, CardTransparencia)
from django.core.exceptions import ValidationError
from django.forms.models import BaseInlineFormSet
# Register your models here.

class ParagrafoAboutInlineFormSet(BaseInlineFormSet):
    def clean(self):
        super().clean()
        ativos = [
                form for form in self.forms
                #exclui os marcados para deleção
                if not form.cleaned_data.get('DELETE', False)
                #checa se o campo 'conteudo' está preenchido, ignorando id e sobre_pdm
                and any(
                    form.cleaned_data.get(field.name)
                    for field in form._meta.model._meta.fields
                    if field.name not in ['id', 'sobre_pdm']  # ignora chaves primárias e FKs automáticas
                )
            ]
        #se nao achar ninguém, levanta o erro de validaçaõ
        if not ativos:
            raise ValidationError("Pelo menos um parágrafo deve ser preenchido.")


class ParagrafoAboutInline(admin.TabularInline):
    model = ParagrafoAbout
    extra = 1
    formset = ParagrafoAboutInlineFormSet

@admin.register(AboutPDM)
class AboutPDMAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'published', 'criado_em', 'criado_por')
    readonly_fields = ('criado_por', 'modificado_por', 'criado_em', 'modificado_em')
    inlines = [ParagrafoAboutInline]

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.criado_por = request.user
        obj.modificado_por = request.user

        if obj.published:
            outras_publicadas = AboutPDM.objects.filter(published=True).exclude(pk=obj.pk)
            if outras_publicadas.exists():
                self.message_user(
                    request,
                    "Outra seção publicada já existe. Ela será despublicada automaticamente.",
                    level=messages.WARNING
                )
                outras_publicadas.update(published=False)

        super().save_model(request, obj, form, change)

class ParagrafoCartaInlineFormSet(BaseInlineFormSet):
    def clean(self):
        super().clean()
        ativos = [
                form for form in self.forms
                #exclui os marcados para deleção
                if not form.cleaned_data.get('DELETE', False)
                #checa se o campo 'conteudo' está preenchido, ignorando id e sobre_pdm
                and any(
                    form.cleaned_data.get(field.name)
                    for field in form._meta.model._meta.fields
                    if field.name not in ['id', 'carta_do_prefeito']  # ignora chaves primárias e FKs automáticas
                )
            ]
        #se nao achar ninguém, levanta o erro de validaçaõ
        if not ativos:
            raise ValidationError("Pelo menos um parágrafo deve ser preenchido.")


class ParagrafoCartaInline(admin.TabularInline):
    model = ParagrafoCartaPrefeito
    extra = 1
    formset = ParagrafoCartaInlineFormSet


@admin.register(CartaPrefeito)
class CartaPrefeitoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'prefeito', 'published')
    readonly_fields = ('criado_por', 'modificado_por', 'criado_em', 'modificado_em')
    inlines = [ParagrafoCartaInline]

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.criado_por = request.user
        obj.modificado_por = request.user

        if obj.published:
            outras_publicadas = CartaPrefeito.objects.filter(published=True).exclude(pk=obj.pk)
            if outras_publicadas.exists():
                self.message_user(
                    request,
                    "Outra carta publicada já existe. Ela será despublicada automaticamente.",
                    level=messages.WARNING
                )
                outras_publicadas.update(published=False)

        super().save_model(request, obj, form, change)

@admin.register(Noticia)
class NoticiaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'data', 'published', 'criado_em', 'criado_por')
    readonly_fields = ('criado_por', 'modificado_por', 'criado_em', 'modificado_em')

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.criado_por = request.user
        obj.modificado_por = request.user

        super().save_model(request, obj, form, change)


class CardHistoricoInline(admin.TabularInline):
    model = CardHistorico
    extra = 1
    verbose_name = "Card do Histórico"
    verbose_name_plural = "Cards do Histórico"

@admin.register(Historico)
class HistoricoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'criado_em', 'criado_por', 'modificado_em', 'modificado_por')
    readonly_fields =  ('criado_em', 'criado_por', 'modificado_em', 'modificado_por')
    inlines = [CardHistoricoInline]

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.criado_por = request.user
        obj.modificado_por = request.user

        if obj.published:
            outras_publicadas = Historico.objects.filter(published=True).exclude(pk=obj.pk)
            if outras_publicadas.exists():
                self.message_user(
                    request,
                    "Outra seção Histórico publicada já existe. Ela será despublicada automaticamente.",
                    level=messages.WARNING
                )
                outras_publicadas.update(published=False)

        super().save_model(request, obj, form, change)

class CardTransparenciaInline(admin.TabularInline):
    model = CardTransparencia
    extra = 1
    verbose_name = "Card da Transparência"
    verbose_name_plural = "Cards da Transparência"

@admin.register(SecaoTransparencia)
class SecaoTransparenciaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'criado_em', 'criado_por', 'modificado_em', 'modificado_por')
    readonly_fields =  ('criado_em', 'criado_por', 'modificado_em', 'modificado_por')
    inlines = [CardTransparenciaInline]

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.criado_por = request.user
        obj.modificado_por = request.user

        if obj.published:
            outras_publicadas = SecaoTransparencia.objects.filter(published=True).exclude(pk=obj.pk)
            if outras_publicadas.exists():
                self.message_user(
                    request,
                    "Outra seção Transparência publicada já existe. Ela será despublicada automaticamente.",
                    level=messages.WARNING
                )
                outras_publicadas.update(published=False)

        super().save_model(request, obj, form, change)