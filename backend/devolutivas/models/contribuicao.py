from django.db import models
from .canal import Canal
from cadastros_basicos.models.estrutura_administrativa import Orgao
from cadastros_basicos.models.regionalizacao import SubPrefeitura


class ContribuicaoSubPrefeitura(models.Model):

    subprefeitura = models.ForeignKey(
        SubPrefeitura,
        blank=False,
        related_name='contribuicao_subprefeitura',
        verbose_name="Subprefeitura",
        on_delete=models.PROTECT
    )
    contribuicao = models.ForeignKey(
        'Contribuicao',
        blank=False,
        related_name='contribuicoes_subprefeituras',
        verbose_name="Contribuição",
        on_delete=models.PROTECT
    )

    class Meta:
        verbose_name = "Subprefeitura relacionada à Contribuição"
        verbose_name_plural = "Subprefeituras relacionadas às Contribuições"

    def __str__(self):
        return f'Contribuição {self.contribuicao.id_contribuicao} relacionada à Subprefeitura {self.subprefeitura.nome}'
    

class Contribuicao(models.Model):

    ORIGEM_CHOICES = [
        ('fala', 'Fala em Audiência Pública'),
        ('revisao', 'Sugestão de Revisão/Alteração no Participe+'),
        ('proposta', 'Proposta no Participe+')
    ]


    id_contribuicao = models.CharField(max_length=36, primary_key=True)
    id_participe_mais = models.CharField(max_length=36, blank=True, null=True)
    canal = models.ForeignKey(Canal, on_delete=models.PROTECT, related_name='contribuicoes')
    origem = models.CharField(max_length=20, choices=ORIGEM_CHOICES)
    titulo = models.CharField(max_length=600, blank=True, null=True)
    resumo = models.CharField(max_length=1000, blank=True, null=True)
    conteudo = models.TextField()
    qtd_apoios = models.IntegerField(blank=True, null=True)
    qtd_comentarios = models.IntegerField(blank=True, null=True)
    subprefeituras = models.ManyToManyField(
        SubPrefeitura,
        blank=True,
        related_name='contribuicoes',
        verbose_name="Subprefeituras relacionadas à Contribuição",
        through=ContribuicaoSubPrefeitura
    )

    @property
    def conteudo_truncated(self):
        if len(self.conteudo) > 75:
            return self.conteudo[:75] + '...'
        return self.conteudo

    class Meta:
        verbose_name = "Contribuição"
        verbose_name_plural = "Contribuições"
        unique_together = ('id_contribuicao', 'origem')
