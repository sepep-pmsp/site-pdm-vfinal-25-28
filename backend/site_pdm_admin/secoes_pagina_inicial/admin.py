from django.contrib import admin, messages
from .models.about_pdm import AboutPDM
# Register your models here.


@admin.register(AboutPDM)
class AboutPDMAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'published', 'criado_em', 'criado_por')
    readonly_fields = ('criado_por', 'modificado_por', 'criado_em', 'modificado_em')

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