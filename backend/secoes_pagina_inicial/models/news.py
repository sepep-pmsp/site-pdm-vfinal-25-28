from django.db import models
from django.core.validators import MinValueValidator

class Noticia(models.Model):

    titulo = models.CharField(max_length=255, verbose_name="Título")
    link = models.URLField(max_length=500, blank=False, null=False, verbose_name="Link")
    data = models.DateField(verbose_name="Data")
    published = models.BooleanField(default=False, verbose_name="Publicado")
    prioridade = models.IntegerField(default=0, verbose_name="Prioridade", validators=[MinValueValidator(0)])
    colocar_no_topo = models.BooleanField(default=False, verbose_name="Colocar no topo - sobrescreve prioridade")
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

    @property
    def data_str(self):
        return self.data.strftime('%d/%m/%Y')

    class Meta:
        verbose_name = "Notícia"
        verbose_name_plural = "Notícias"

    def save(self, *args, **kwargs):
        if self.colocar_no_topo:
            maior = Noticia.objects.aggregate(models.Max("prioridade"))["prioridade__max"] or 0
            self.prioridade = maior + 1
        super().save(*args, **kwargs)

    def __str__(self):
        return self.titulo