from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

User = get_user_model()

class AboutPDM(models.Model):
    titulo = models.CharField(max_length=255, verbose_name="Título")
    subtitulo = models.CharField(max_length=500, verbose_name="Subtítulo")
    paragrafo = models.TextField(verbose_name="Parágrafo")
    published = models.BooleanField(default=False, verbose_name="Publicado")
    criado_em = models.DateTimeField(auto_now_add=True)
    criado_por = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='secoes_criadas'
    )

    modificado_em = models.DateTimeField(auto_now=True)
    modificado_por = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='secoes_modificadas',
        editable=False
    )


    class Meta:
        verbose_name = "Seção Sobre o PDM"
        verbose_name_plural = "Seções Sobre o PDM"
            
    def save(self, *args, **kwargs):
        if self.published:
            AboutPDM.objects.filter(published=True).exclude(pk=self.pk).update(published=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'Seção Sobre o PDM: {self.titulo[:20]}...'