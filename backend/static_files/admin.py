from django.contrib import admin
from .models import Imagem

@admin.register(Imagem)
class ImagemAdmin(admin.ModelAdmin):
    readonly_fields = ('largura', 'altura', 'formato', 'data_envio', 'enviado_por')

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.enviado_por = request.user
        super().save_model(request, obj, form, change)