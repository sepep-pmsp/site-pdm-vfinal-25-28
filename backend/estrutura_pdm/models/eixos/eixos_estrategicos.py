from django.db import models
from static_files.models import Imagem
from django.core.validators import RegexValidator
from estrutura_pdm.models.pdm import PDM

hex_color_validator = RegexValidator(
    regex=r'^#([A-Fa-f0-9]{6})$',
    message='Informe uma cor hexadecimal no formato #RRGGBB (ex: #1A2B3C).'
)

class Eixo(models.Model):

    nome = models.CharField(max_length=100, unique=True, verbose_name="Nome do Eixo")
    titulo = models.CharField(max_length=200, blank=False, null=False, verbose_name="Título do Eixo")
    descricao = models.TextField(blank=False, null=False, verbose_name="Descrição do Eixo")
    resumo = models.CharField(
        max_length=255, blank=False, null=False, verbose_name="Resumo do Eixo"
    )
    ordem = models.PositiveIntegerField(
        default=0,
        verbose_name="Ordem de Exibição",
        help_text="Define a ordem de exibição dos eixos. Eixos com ordem menor serão exibidos primeiro."
    )

    pdm = models.ForeignKey(
        PDM,
        on_delete=models.PROTECT,
        related_name="eixos",
        verbose_name="PDM Associado"
    )

    @property
    def descricao_as_list(self)->list[str]:
        """
        Retorna a descrição do eixo como uma lista de strings, separando por quebras de linha.
        """
        return self.descricao.splitlines() if self.descricao else []

    logo_colorido = models.ForeignKey(
        Imagem,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        verbose_name="Logo do Eixo",
        related_name="eixo_estrategico"
    )

    logo_branco = models.ForeignKey(
        Imagem,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        verbose_name="Logo do Eixo (Branco)",
        related_name="eixo_estrategico_branco"
    )

    cor_principal = models.CharField(
        max_length=7,
        default="#000000",
        validators=[hex_color_validator],
        verbose_name="Cor Principal do Eixo"
    )

    orcamento = models.IntegerField(
        default=0,
        verbose_name="Orçamento do Eixo",
        help_text="Orçamento total alocado para este eixo."
    )
    
    class Meta:
        verbose_name = "Eixo"
        verbose_name_plural = "Eixos"
        ordering = ['ordem']

    def __str__(self):
        return self.nome