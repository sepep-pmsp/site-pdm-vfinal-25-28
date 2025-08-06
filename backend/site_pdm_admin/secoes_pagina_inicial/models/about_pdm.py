from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from static_files.models import Imagem

User = get_user_model()


class AboutPDM(models.Model):
    titulo = models.CharField(max_length=255, verbose_name="Título")
    subtitulo = models.CharField(max_length=500, verbose_name="Subtítulo")
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

    banner_image = models.ForeignKey(
        Imagem,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='about_pdm',
        verbose_name="Imagem Banner"
    )

    @property
    def paragrafo_as_str(self):
        return '\n'.join([paragrafo.conteudo for paragrafo in self.paragrafos.all()])

    def clean(self):
        if self.pk and self.paragrafos.count() == 0:
            raise ValidationError("Pelo menos um parágrafo deve estar vinculado a este AboutPDM.")
        super().clean()


    class Meta:
        verbose_name = "Seção Sobre o PDM"
        verbose_name_plural = "Seções Sobre o PDM"
            
    def save(self, *args, **kwargs):

        self.full_clean()
        if self.published:
            AboutPDM.objects.filter(published=True).exclude(pk=self.pk).update(published=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'Seção Sobre o PDM: {self.titulo[:20]}...'
    

class ParagrafoAbout(models.Model):

    sobre_pdm = models.ForeignKey(AboutPDM, related_name='paragrafos', on_delete=models.CASCADE)
    conteudo = models.TextField(verbose_name="Conteúdo do Parágrafo")
    ordem = models.PositiveIntegerField(verbose_name="Ordem do Parágrafo")

    class Meta:
        ordering = ['ordem']
        verbose_name = "Parágrafo"
        verbose_name_plural = "Parágrafos"

    def __str__(self):

        return f'Parágrafo {self.ordem}: {self.conteudo[:30]}...'