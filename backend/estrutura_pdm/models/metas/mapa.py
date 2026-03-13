from django.db import models
from static_files.models import Imagem
from estrutura_pdm.models.metas import Meta
from django.core.exceptions import ValidationError
from .mapa_abstract import MapaAbstract
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

    frase_regionalizacao = models.TextField(
        null=True,
        blank=True,
        verbose_name='Frase para quando a meta é regionalizável'
    )

    def clean(self):
        super().clean()

        if self.meta.status_regionalizacao == StatusRegionalizacao.NAO_REGIONALIZAVEL and self.frase_regionalizacao:
            raise ValidationError("Não é possível adicionar uma frase para quando a meta é regionalizável a uma meta não regionalizável.")
        
        if self.meta.status_regionalizacao == StatusRegionalizacao.REGIONALIZADA and self.frase_regionalizacao:
            raise ValidationError("Não é possível adicionar uma frase para quando a meta é regionalizável a uma meta já regionalizada.")
        
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

class MapaPlanejado(MapaAbstract):

    mapa_meta = models.OneToOneField(
        MapaMeta,
        on_delete=models.CASCADE,
        related_name='mapa_planejado',
        verbose_name='MapaMeta',
        null=True,
        blank=True
    )
    def clean(self):
        super().clean()

    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)
    

class MapaExecutado(MapaAbstract):
    mapa_meta = models.OneToOneField(
        MapaMeta,
        on_delete=models.CASCADE,
        related_name='mapa_executado',
        verbose_name='MapaMeta',
        null=True,
        blank=True
    )
    def clean(self):
        super().clean()

    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)
    





