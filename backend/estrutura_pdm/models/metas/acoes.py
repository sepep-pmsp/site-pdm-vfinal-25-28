from django.db import models
from .metas import Meta

class AcaoEstrategica(models.Model):

    posicao = models.IntegerField(blank=False, null=False, verbose_name="Ordem de Apresentação da Ação Estratégica")
    descricao = models.CharField(max_length=100, unique=True, verbose_name="Descrição da Ação Estratégica")
    
    meta = models.ForeignKey(
        Meta,
        blank=False,
        related_name='acoes_estrategicas',
        verbose_name="Meta relacionada",
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = "Ação Estratégica"
        verbose_name_plural = "Ações Estratégicas"
        ordering = ['meta__numero', 'posicao']

    def __str__(self):
        return self.descricao