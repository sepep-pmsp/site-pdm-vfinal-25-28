from django.db import models
from static_files.models import Imagem
from estrutura_pdm.models.metas import Meta
from django.core.exceptions import ValidationError

from .relacionamentos_meta import StatusRegionalizacao

class MapaMeta(models.Model):

    meta = models.OneToOneField(
        Meta,
        on_delete=models.CASCADE,
        related_name='mapa',
        verbose_name='Meta',
        null=True,
        blank=True
    )
    map_image = models.ForeignKey(
        Imagem,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='mapa_meta',
        verbose_name="Mapa da Meta"
    )

    indicador_legenda = models.TextField(
        null=False,
        blank=False,
        verbose_name='Indicador da Legenda do Mapa'
    )

    nota_rodape = models.TextField(
        null=False,
        blank=False,
        verbose_name='Nota de rodapé do mapa'
    )

    frase_regionalizacao = models.TextField(
        null=False,
        blank=False,
        verbose_name='Frase para quando a meta é regionalizável'
    )

    def clean(self):

        if self.meta.status_regionalizacao == StatusRegionalizacao.NAO_REGIONALIZAVEL and self.map_image:
            raise ValidationError("Não é possível associar um mapa a uma meta não regionalizável.")
        
        if self.meta.status_regionalizacao == StatusRegionalizacao.NAO_REGIONALIZAVEL and self.indicador_legenda:
            raise ValidationError("Não é possível adicionar um indicador de legenda a uma meta não regionalizável.")
        
        if self.meta.status_regionalizacao == StatusRegionalizacao.NAO_REGIONALIZAVEL and self.nota_rodape:
            raise ValidationError("Não é possível adicionar uma nota de rodapé a uma meta não regionalizável.")
        
        if self.meta.status_regionalizacao == StatusRegionalizacao.NAO_REGIONALIZAVEL and self.frase_regionalizacao:
            raise ValidationError("Não é possível adicionar uma frase para quando a meta é regionalizável a uma meta não regionalizável.")
        
        if self.meta.status_regionalizacao == StatusRegionalizacao.REGIONALIZADA and self.frase_regionalizacao:
            raise ValidationError("Não é possível adicionar uma frase para quando a meta é regionalizável a uma meta já regionalizada.")
        
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


