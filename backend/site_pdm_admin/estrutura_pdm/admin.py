from django.contrib import admin

from .models.eixos.eixos_estrategicos import Eixo
from .models.eixos.temas import Tema

# Register your models here.
admin.site.register(Tema)

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
