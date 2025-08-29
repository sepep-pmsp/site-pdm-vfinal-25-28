from django.db import models
from django.core.exceptions import ValidationError
from .contribuicao import Contribuicao
from .temas import Tema
from cadastros_basicos.models.estrutura_administrativa import Orgao



class Devolutiva(models.Model):

    contribuicao = models.ForeignKey(
        Contribuicao,
        blank=False,
        related_name='devolutivas',
        verbose_name="Contribuição",
        on_delete=models.PROTECT
    )
    tema = models.ForeignKey(
        Tema,
        blank=False,
        related_name='devolutivas',
        verbose_name="Tema",
        on_delete=models.PROTECT
    )
    
    orgao = models.ForeignKey(
        Orgao,
        blank=False,
        null=False,
        related_name='devolutivas',
        verbose_name="Órgão Responsável pela Devolutiva",
        on_delete=models.PROTECT
    )
    resposta = models.TextField()


    @property
    def resposta_truncated(self):
        if len(self.resposta) > 75:
            return self.resposta[:75] + '...'
        return self.resposta

    @property
    def str_sigla_orgao(self):
        return self.orgao.sigla

    class Meta:
        verbose_name = "Devolutiva"
        verbose_name_plural = "Devolutivas"
        unique_together = ('contribuicao', 'tema', 'orgao', 'resposta')

    def __str__(self):
        return f'Devolutiva {self.id} para a Contribuição {self.contribuicao.id_contribuicao}'
