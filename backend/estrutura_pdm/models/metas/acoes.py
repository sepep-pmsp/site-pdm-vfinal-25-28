from django.db import models
from .metas import Meta
from cadastros_basicos.models.estrutura_administrativa import Orgao

class AcaoEstrategica(models.Model):

    posicao = models.IntegerField(blank=False, null=False, verbose_name="Ordem de Apresentação da Ação Estratégica")
    descricao = models.CharField(max_length=100, unique=True, verbose_name="Descrição da Ação Estratégica")
    numero = models.CharField(max_length=20, unique=True, verbose_name="Número da Ação Estratégica")

    meta = models.ForeignKey(
        Meta,
        blank=False,
        null=False,
        related_name='acoes_estrategicas',
        verbose_name="Meta relacionada",
        on_delete=models.CASCADE
    )

    orgao_responsavel = models.ForeignKey(
        Orgao,
        blank=False,
        null=False,
        related_name='acoes_estrategicas',
        verbose_name="Órgão Responsável",
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = "Ação Estratégica"
        verbose_name_plural = "Ações Estratégicas"
        ordering = ['meta__numero', 'posicao']

    def __str__(self):
        return self.descricao