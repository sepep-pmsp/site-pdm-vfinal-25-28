from django.db import models
from django.core.exceptions import ValidationError
from .contribuicao import Contribuicao
from .temas import Tema
from cadastros_basicos.models.estrutura_administrativa import Orgao


class DevolutivaOrgao(models.Model):

    orgao = models.ForeignKey(
        Orgao,
        blank=False,
        related_name='devolutiva_orgao',
        verbose_name="Órgão",
        on_delete=models.PROTECT
    )
    devolutiva = models.ForeignKey(
        'Devolutiva',
        blank=False,
        related_name='devolutivas_orgaos',
        verbose_name="Devolutiva",
        on_delete=models.PROTECT
    )

    class Meta:
        verbose_name = "Órgão Responsável pela Devolutiva"
        verbose_name_plural = "Órgãos Responsáveis pelas Devolutivas"

    def __str__(self):
        return f'Devolutiva {self.devolutiva.id} com resposta pelo Órgão {self.orgao.sigla}  '

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
    

    orgaos_responsaveis = models.ManyToManyField(
        Orgao,
        blank=True,
        related_name='devolutivas',
        verbose_name="Órgãos responsáveis pela Devolutiva",
        through=DevolutivaOrgao
    )

    resposta = models.TextField()


    @property
    def resposta_truncated(self):
        if len(self.resposta) > 75:
            return self.resposta[:75] + '...'
        return self.resposta
    
    @property
    def list_siglas_orgaos_responsaveis(self):
        return [orgao.sigla for orgao in self.orgaos_responsaveis.all()]
    
    @property
    def str_siglas_orgaos_responsaveis(self):
        return ', '.join(self.list_siglas_orgaos_responsaveis)
    
    def clean(self):
        super().clean()
        if self.pk and not self.orgaos_responsaveis.exists():
            raise ValidationError("É necessário informar ao menos um Órgão responsável.")

    class Meta:
        verbose_name = "Devolutiva"
        verbose_name_plural = "Devolutivas"

    def __str__(self):
        return f'Devolutiva {self.id} para a Contribuição {self.contribuicao.id_contribuicao}'
