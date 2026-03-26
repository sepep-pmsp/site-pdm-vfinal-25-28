from django.db import models
from django.core.exceptions import ValidationError, ObjectDoesNotExist

from ..eixos import Eixo, Tema
from cadastros_basicos.models.estrutura_administrativa import Orgao
from cadastros_basicos.models.regionalizacao import SubPrefeitura, Zona
from cadastros_basicos.models.vinculos_externos import ODS, PlanoSetorial

from .relacionamentos_meta import (
    MetaOrgao, 
    MetaSubprefeitura, 
    MetaZona, 
    MetaODS, 
    MetaPlanoSetorial, 
    StatusRegionalizacao
)

from .status_monitoramento import StatusMonitoramento


class Meta(models.Model):
    #general
    numero = models.IntegerField(blank=False, null=False, verbose_name="Número da Meta")
    destaque = models.CharField(max_length=500, null=False, blank=False, unique=True, verbose_name="Destaque da Meta")
    descricao = models.TextField(blank=False, null=False, verbose_name="Descrição da Meta")
    indicador = models.CharField(max_length=500, blank=False, null=False, verbose_name="Indicador da Meta")
    projecao = models.CharField(max_length=500, blank=False, null=False, verbose_name="Projeção da Meta")
    evolucao= models.TextField(blank=True, null=True, verbose_name="Evolução da Meta")
    
    status_monitoramento = models.CharField(
        max_length=50,
        choices=StatusMonitoramento.choices,
        default=StatusMonitoramento.PLANEJAMENTO,
        verbose_name="Monitoramento"
    )

    status_regionalizacao = models.CharField(
        max_length=50,
        choices=StatusRegionalizacao.choices,
        default=StatusRegionalizacao.NAO_REGIONALIZAVEL,
        verbose_name="Status de Regionalização"
    )

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

#   Órgãos Responsáveis
    orgaos_responsaveis = models.ManyToManyField(
        Orgao,
        blank=True,
        related_name='metas',
        verbose_name="Órgãos responsáveis",
        through='MetaOrgao'
    )
    # Subprefetirua com Entregas
    subprefeituras_entregas = models.ManyToManyField(
        SubPrefeitura,
        blank=True,
        related_name='metas',
        verbose_name="Subprefeituras com entregas",
        through='MetaSubprefeitura'
    )
#   Zonas com entregas
    zonas_entregas = models.ManyToManyField(
        Zona,
        blank=True,
        related_name='metas',
        verbose_name="Zonas com entregas",
        through='MetaZona'
    )
#ODS relacionadas à meta
    ods_relacionados = models.ManyToManyField(
        ODS,
        blank=True,
        related_name='metas',
        verbose_name="ODS relacionados",
        through='MetaODS'
    )
#   Planos setoriais relacionados
    planos_setoriais_relacionados = models.ManyToManyField(
        PlanoSetorial,
        blank=True,
        related_name='metas',
        verbose_name="Planos Setoriais relacionados",
        through='MetaPlanoSetorial'
    )

    @property
    def subprefeituras_entregas_list(self)->list[str]:
        return [sub.sigla for sub in self.subprefeituras_entregas.all()]
    

    @property
    def zonas_entregas_list(self)->list[str]:
        zonas = set()
        for sub in self.subprefeituras_entregas.all():
            zona_sub = sub.zona
            if zona_sub:
                zonas.add(zona_sub.sigla)
        return list(zonas)
    
    @property
    def orgaos_responsaveis_list(self)->list[str]:
        return [org.sigla for org in self.orgaos_responsaveis.all()]
    
    @property
    def ods_relacionados_list(self)->list[str]:
        return [f'ODS {ods.numero}' for ods in self.ods_relacionados.all()]
    
    @property
    def planos_setoriais_relacionados_list(self)->list[str]:
        return [plano.nome for plano in self.planos_setoriais_relacionados.all()]
    
    @property
    def numero_as_str(self):
        return str(self.numero).zfill(2)

    @property
    def id_eixo(self):

        primeira_letra_eixo = self.eixo.nome[0].upper()
        numero = self.numero_as_str

        return f'{primeira_letra_eixo}{numero}'
    
    @property
    def cor_principal_eixo(self):

        return self.eixo.cor_principal
    
    @property
    def cor_secundaria_eixo(self):

        return self.eixo.cor_secundaria
    
    @property
    def titulo(self): #General

        destaque_negrito = f"<strong>{self.destaque}</strong>"
        desc_com_destaque = self.descricao.replace(self.destaque, destaque_negrito)
        return desc_com_destaque
    
    @property
    def frase_pertencimento_eixo(self):

        resumo = self.eixo.resumo
        frase = f'Essa meta faz parte do eixo {self.eixo.nome}.'

        return [frase, resumo] if resumo else frase
    
    # Resultados Apurados
    @property
    def resultados_apurados_as_list(self):
        return[
            {
                'resultados_apurados_value': resultados.resultado_value,
                'mes': resultados.mes,
                'ano': resultados.ano,
                'data': resultados.data,
            }
            for resultados in self.resultados_apurados.all() #-> ForeingKey related name (models/metas/resultados_apurados.py)
        ]

    # Ações estratégicas
    @property
    def acoes_estrategicas_as_list(self):
        return [
            {
                "numero": acao.numero,
                "descricao": acao.descricao,
                "concluida": acao.concluida,
                "evolucao_negrito": acao.evolucao_negrito,
                "descricao_evolucao" : acao.descricao_evolucao,

            }
            for acao in self.acoes_estrategicas.all()
        ]
    
    def checagem_destaque(self):

        words_destaque =  set(self.destaque.lower().split())
        words_descricao = set(self.descricao.lower().split())

        return words_destaque.issubset(words_descricao)

    def clean(self):
        super().clean()
        if not self.checagem_destaque():
            raise ValidationError({
                'descricao': 'O conteúdo do campo destaque deve estar contido no campo descrição.'
            })
        
        if not self.tema in self.eixo.temas.all():
            raise ValidationError({
                'tema': 'O tema selecionado não pertence ao eixo relacionado.'
            })
        
        if self.status_regionalizacao == StatusRegionalizacao.NAO_REGIONALIZAVEL:
            try:
                mapa=self.mapa
                if mapa.exists():
                    raise ValidationError("Não é possível associar um mapa a uma meta que não é regionalizável.")
            except ObjectDoesNotExist:
                pass
        

    class Meta:
        verbose_name = "Meta"
        verbose_name_plural = "Metas"
        ordering = ['destaque']

    def __str__(self):
        return f'Meta {self.numero}'