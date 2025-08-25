#essa secao apenas fala sobre a regionalizacao, nao esta vinculada aos objetos das Metas
from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class SecaoRegionalizacao(models.Model):

    titulo = models.CharField(max_length=255, verbose_name="Título")
    subtitulo = models.CharField(max_length=500, verbose_name="Subtítulo")
    instrucao = models.TextField(verbose_name="Instrução")
    link_arquivo = models.URLField(verbose_name="Link para Download do Arquivo")
    link_dashboard = models.URLField(verbose_name="Link para Dashboard")
                                       
    published = models.BooleanField(default=False, verbose_name="Publicado")
    criado_em = models.DateTimeField(auto_now_add=True)
    criado_por = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='secoes_regionalizacao_criadas'
    )

    modificado_em = models.DateTimeField(auto_now=True)
    modificado_por = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='secoes_regionalizacao_modificadas',
        editable=False
    )


    @property
    def paragrafo_as_list(self):
        return [paragrafo.conteudo for paragrafo in self.paragrafos.all()]
    

    @property
    def paragrafo_as_str(self):
        return "\n".join(self.paragrafo_as_list)

    def save(self, *args, **kwargs):

        self.full_clean()
        if self.published:
            SecaoRegionalizacao.objects.filter(published=True).exclude(pk=self.pk).update(published=False)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Seção Regionalização"
        verbose_name_plural = "Seções Regionalização"

    def __str__(self):
        return f'Seção Regionalização: {self.titulo[:20]}...'
    

class ParagrafoSecaoRegionalizacao(models.Model):

    secao_regionalizacao = models.ForeignKey(SecaoRegionalizacao, related_name='paragrafos', on_delete=models.CASCADE)
    conteudo = models.TextField(verbose_name="Conteúdo do Parágrafo da Seção Regionalização")
    ordem = models.PositiveIntegerField(verbose_name="Ordem do Parágrafo")

    @property
    def criado_por(self):
        return self.secao_regionalizacao.criado_por
    
    @property
    def modificado_por(self):
        return self.secao_regionalizacao.modificado_por

    @property
    def criado_em(self):
        return self.secao_regionalizacao.criado_em

    @property
    def modificado_em(self):
        return self.secao_regionalizacao.modificado_em

    class Meta:
        ordering = ['ordem']
        verbose_name = "Parágrafo Regionalização"
        verbose_name_plural = "Parágrafos Regionalização"

    def __str__(self):

        return f'Parágrafo {self.ordem}: {self.conteudo[:30]}...'