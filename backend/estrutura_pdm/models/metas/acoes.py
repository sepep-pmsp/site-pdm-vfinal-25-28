from django.db import models
from .metas import Meta
from django.core.exceptions import ValidationError
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
    descricao = models.CharField(max_length=5000, verbose_name="Descrição da Ação Estratégica")
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

    @property
    def siglas_orgaos_responsaveis(self):

        return ', '.join(self.orgaos_responsaveis.values_list('sigla', flat=True))

    def clean(self):
        """Valida que o numero da ação começa com o numero da meta"""

        super().clean()
        num_meta = str(self.meta.numero)
        if not self.numero.startswith(num_meta):
            raise ValidationError(
                f'O número da ação estratégica deve começar com o número da meta {num_meta}.'
            )
    
        num_acao = self.numero
        num_acao = num_acao.replace('.', '')
        if not num_acao.isdigit():
            raise ValidationError({
                'numero': 'O número da ação estratégica deve conter apenas dígitos.'
            })
        
        return self.numero

        
    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Ação Estratégica"
        verbose_name_plural = "Ações Estratégicas"
        ordering = ['meta__numero', 'posicao']

    def __str__(self):
        return self.descricao