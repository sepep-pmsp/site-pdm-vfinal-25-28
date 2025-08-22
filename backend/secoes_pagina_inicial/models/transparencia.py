from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

User = get_user_model()


class SecaoTransparencia(models.Model):
    titulo = models.CharField(max_length=255, verbose_name="Título")
    subtitulo = models.CharField(max_length=500, verbose_name="Subtítulo", blank=True, null=True)
    published = models.BooleanField(default=False, verbose_name="Publicado")
    
    criado_em = models.DateTimeField(auto_now_add=True)
    criado_por = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='secoes_transparencia_criadas'
    )

    modificado_em = models.DateTimeField(auto_now=True)
    modificado_por = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='secoes_transparencia_modificadas',
        editable=False
    )


    class Meta:
        verbose_name = "Seção Transparência"
        verbose_name_plural = "Seções Transparência"

    def save(self, *args, **kwargs):

        self.full_clean()
        if self.published:
            SecaoTransparencia.objects.filter(published=True).exclude(pk=self.pk).update(published=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'Seção Transparência: {self.titulo[:20]}...'


class CardTransparencia(models.Model):

    titulo = models.CharField(max_length=255, verbose_name="Título do Card")
    conteudo = models.TextField(verbose_name="Conteúdo do Card")
    ordem = models.PositiveIntegerField(verbose_name="Ordem do Card")
    botao_txt = models.CharField(max_length=100, verbose_name="Texto do Botão", blank=True, null=True)
    botao_url = models.URLField(verbose_name="URL do Botão")
    published = models.BooleanField(default=False, verbose_name="Publicado")

    secao_transparencia: models.ForeignKey[SecaoTransparencia] = models.ForeignKey(SecaoTransparencia, related_name='cards', on_delete=models.CASCADE)

    @property
    def criado_por(self):
        return self.secao_transparencia.criado_por

    @property
    def modificado_por(self):
        return self.secao_transparencia.modificado_por

    @property
    def criado_em(self):
        return self.secao_transparencia.criado_em

    @property
    def modificado_em(self):
        return self.secao_transparencia.modificado_em

    class Meta:
        ordering = ['ordem']
        verbose_name = "Card Transparência"
        verbose_name_plural = "Cards Transparência"


    def __str__(self):

        return f'Card Transparência {self.ordem}: {self.titulo[:30]}...'