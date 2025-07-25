from django.db import models
from django.core.exceptions import ValidationError

from ..eixos import Eixo, Tema
from cadastros_basicos.models.estrutura_administrativa import Orgao
from cadastros_basicos.models.regionalizacao import SubPrefeitura

class MetaOrgao(models.Model):
    orgao = models.ForeignKey(
        Orgao,
        blank=False,
        related_name='meta_orgao',
        verbose_name="Órgão",
        on_delete=models.CASCADE
    )
    meta = models.ForeignKey(
        'Meta',
        blank=False,
        related_name='meta_orgao',
        verbose_name="Meta",
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = "Órgão Responsável pela Meta"
        verbose_name_plural = "Órgãos Responsáveis pelas Metas"

    def __str__(self):
        return f'{self.orgao.nome} responsável pela meta {self.meta.numero}'
    
class MetaSubprefeitura(models.Model):
    subprefeitura = models.ForeignKey(
        SubPrefeitura,
        blank=False,
        related_name='meta_subprefeitura',
        verbose_name="Subprefeitura",
        on_delete=models.CASCADE
    )
    meta = models.ForeignKey(
        'Meta',
        blank=False,
        related_name='meta_subprefeitura',
        verbose_name="Meta",
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = "Subprefeitura Responsável pela Meta"
        verbose_name_plural = "Subprefeituras Responsáveis pelas Metas"

    def __str__(self):
        return f'Meta {self.meta.numero} com entregas na Subprefeitura {self.subprefeitura.sigla}  '

class Meta(models.Model):

    numero = models.IntegerField(blank=False, null=False, verbose_name="Número da Meta")
    destaque = models.CharField(max_length=500, null=False, blank=False, unique=True, verbose_name="Destaque da Meta")
    descricao = models.TextField(blank=False, null=False, verbose_name="Descrição da Meta")
    indicador = models.CharField(max_length=500, blank=False, null=False, verbose_name="Indicador da Meta")
    projecao = models.CharField(max_length=500, blank=False, null=False, verbose_name="Projeção da Meta")

    eixo = models.ForeignKey(
        Eixo,
        blank=False,
        related_name='metas',
        verbose_name="Eixo relacionado",
        on_delete=models.CASCADE
    )
    tema = models.ForeignKey(
        Tema,
        blank=False,
        related_name='metas',
        verbose_name="Tema relacionado",
        on_delete=models.CASCADE
    )

    orgaos_responsaveis = models.ManyToManyField(
        Orgao,
        blank=True,
        related_name='metas',
        verbose_name="Órgãos responsáveis",
        through='MetaOrgao'
    )

    subprefeituras_entregas = models.ManyToManyField(
        SubPrefeitura,
        blank=True,
        related_name='metas',
        verbose_name="Subprefeituras com entregas",
        through='MetaSubprefeitura'
    )

    def clean(self):
        super().clean()
        if not self.descricao.startswith(self.destaque):
            raise ValidationError({
                'descricao': 'A descrição deve começar com o conteúdo do campo destaque.'
            })
        
        if not self.tema in self.eixo.temas.all():
            raise ValidationError({
                'tema': 'O tema selecionado não pertence ao eixo relacionado.'
            })

    class Meta:
        verbose_name = "Meta"
        verbose_name_plural = "Metas"
        ordering = ['destaque']

    def __str__(self):
        return f'Meta {self.numero}'