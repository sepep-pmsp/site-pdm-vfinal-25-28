from django.db import models
from .metas import Meta
from cadastros_basicos.models.estrutura_administrativa import Orgao


class AcaoOrgao(models.Model):
    orgao = models.ForeignKey(
        Orgao,
        blank=False,
        related_name='acao_orgao',
        verbose_name="Órgão",
        on_delete=models.CASCADE
    )
    acao = models.ForeignKey(
        'AcaoEstrategica',
        blank=False,
        related_name='acoes_estrategicas',
        verbose_name="Ações Estratégicas",
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = "Órgão Responsável pela Ação Estratégica"
        verbose_name_plural = "Órgãos Responsáveis pelas Ações Estratégicas"

    def __str__(self):
        return f'Ação {self.acao.numero} com entregas pelo Órgão {self.orgao.sigla}  '

class AcaoEstrategica(models.Model):

    posicao = models.IntegerField(blank=False, null=False, verbose_name="Ordem de Apresentação da Ação Estratégica")
    descricao = models.CharField(max_length=100, verbose_name="Descrição da Ação Estratégica")
    numero = models.CharField(max_length=20, unique=True, verbose_name="Número da Ação Estratégica")

    meta = models.ForeignKey(
        Meta,
        blank=False,
        null=False,
        related_name='acoes_estrategicas',
        verbose_name="Meta relacionada",
        on_delete=models.CASCADE
    )

    orgaos_responsaveis = models.ManyToManyField(
        Orgao,
        blank=True,
        related_name='acoes_estrategicas',
        verbose_name="Órgãos responsáveis pela Ação Estratégica",
        through='AcaoOrgao'
    )

    class Meta:
        verbose_name = "Ação Estratégica"
        verbose_name_plural = "Ações Estratégicas"
        ordering = ['meta__numero', 'posicao']

    def __str__(self):
        return self.descricao