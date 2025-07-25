from django.db import models


class Noticia(models.Model):

    titulo = models.CharField(max_length=255, verbose_name="Título")
    link = models.URLField(max_length=500, blank=False, null=False, verbose_name="Link")
    data = models.DateField(verbose_name="Data")
    publicado = models.BooleanField(default=False, verbose_name="Publicado")
    criado_em = models.DateTimeField(auto_now_add=True)
    criado_por = models.ForeignKey(
        'auth.User',
        on_delete=models.PROTECT,
        related_name='noticias_criadas'
    )
    modificado_em = models.DateTimeField(auto_now=True)
    modificado_por = models.ForeignKey(
        'auth.User',
        on_delete=models.PROTECT,
        related_name='noticias_modificadas',
        editable=False
    )

    class Meta:
        verbose_name = "Notícia"
        verbose_name_plural = "Notícias"

    def __str__(self):
        return self.titulo