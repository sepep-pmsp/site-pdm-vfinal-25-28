from django.db import models
from static_files.models import Imagem
from estrutura_pdm.models.metas import Meta
from django.core.exceptions import ValidationError
from .relacionamentos_meta import StatusRegionalizacao

class MapaAbstract(models.Model):
    meta=models.OneToOneField(
        Meta,
        on_delete=models.CASCADE,
        related_name='mapa_abstract',
        verbose_name='Meta',
        null=True,
        blank=True
    )
    map_image = models.ForeignKey(
        Imagem,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='map_abstract',
        verbose_name='Mapa da Meta'
    )

    indicador_legenda = models.TextField(
        null=True,
        blank=True,
        verbose_name= 'Indicador de Legenda do Mapa'
    )

    nota_rodape = models.TextField(
        null=True,
        blank=True,
        verbose_name='Nota de rodapé do mapa'
    )

    def clean(self):
        super().clean()

        if self.meta.status_regionalizacao == StatusRegionalizacao.NAO_REGIONALIZAVEL and self.map_image:
            raise ValidationError("Não é possível associar um mapa a uma meta não regionalizável.")
        
        if self.meta.status_regionalizacao == StatusRegionalizacao.NAO_REGIONALIZAVEL and self.indicador_legenda:
            raise ValidationError("Não é possível adicionar um indicador de legenda a uma meta não regionalizável.")
        
        if self.meta.status_regionalizacao == StatusRegionalizacao.NAO_REGIONALIZAVEL and self.nota_rodape:
            raise ValidationError("Não é possível adicionar uma nota de rodapé a uma meta não regionalizável.")
        

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
