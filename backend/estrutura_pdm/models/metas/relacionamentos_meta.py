
from django.db import models

from cadastros_basicos.models.estrutura_administrativa import Orgao
from cadastros_basicos.models.regionalizacao import SubPrefeitura, Zona
from cadastros_basicos.models.vinculos_externos import ODS, PlanoSetorial

class MetaOrgao(models.Model):
    orgao = models.ForeignKey(
        Orgao,
        blank=False,
        related_name='meta_orgao',
        verbose_name="Órgão",
        on_delete=models.PROTECT
    )
    meta = models.ForeignKey(
        'Meta',
        blank=False,
        related_name='meta_orgao',
        verbose_name="Meta",
        on_delete=models.PROTECT
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
        verbose_name = "Subprefeitura que a Meta possui entregas"
        verbose_name_plural = "Subprefeituras que a Meta possui entregas"

    def __str__(self):
        return f'Meta {self.meta.numero} com entregas na Subprefeitura {self.subprefeitura.sigla}'

class MetaZona(models.Model):
    zona = models.ForeignKey(
        Zona,
        blank=False,
        related_name='meta_zona',
        verbose_name="Zona",
        on_delete=models.CASCADE
    )
    meta = models.ForeignKey(
        'Meta',
        blank=False,
        related_name='meta_zona',
        verbose_name="Meta",
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = "Zona que a Meta possui entregas"
        verbose_name_plural = "Zonas que a Meta possui entregas"

    def __str__(self):
        return f'Meta {self.meta.numero} com entregas na Zona {self.zona.sigla}'
    
class MetaPlanoSetorial(models.Model):
    plano_setorial = models.ForeignKey(
        PlanoSetorial,
        blank=False,
        related_name='meta_plano_setorial',
        verbose_name="Plano Setorial",
        on_delete=models.CASCADE
    )
    meta = models.ForeignKey(
        'Meta',
        blank=False,
        related_name='meta_plano_setorial',
        verbose_name="Meta",
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = "Plano Setorial relacionado à Meta"
        verbose_name_plural = "Planos relacionado à Meta"

    def __str__(self):
        return f'Meta {self.meta.numero} relacionada ao Plano Setorial {self.plano_setorial.nome}'


class MetaODS(models.Model):
    ods = models.ForeignKey(
        ODS,
        blank=False,
        related_name='meta_ods',
        verbose_name="ODS",
        on_delete=models.CASCADE
    )
    meta = models.ForeignKey(
        'Meta',
        blank=False,
        related_name='meta_ods',
        verbose_name="Meta",
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = "ODS relacionado à Meta"
        verbose_name_plural = "ODS relacionado à Meta"

    def __str__(self):
        return f'Meta {self.meta.numero} relacionada ao ODS {self.ods.numero}'

