from django.db import models
from static_files.models import Imagem
from django.core.validators import RegexValidator

hex_color_validator = RegexValidator(
    regex=r'^#([A-Fa-f0-9]{6})$',
    message='Informe uma cor hexadecimal no formato #RRGGBB (ex: #1A2B3C).'
)

class Eixo(models.Model):

    nome = models.CharField(max_length=100, unique=True, verbose_name="Nome do Eixo")
    descricao = models.TextField(blank=True, null=True, verbose_name="Descrição do Eixo")
    resumo: models.CharField = models.CharField(
        max_length=255, blank=True, null=True, verbose_name="Resumo do Eixo"
    )

    logo = models.ForeignKey(
        Imagem,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        verbose_name="Logo do Eixo",
        related_name="eixo_estrategico"
    )

    cor_principal = models.CharField(
        max_length=7,
        default="#000000",
        validators=[hex_color_validator],
        verbose_name="Cor Principal do Eixo"
    )
    
    class Meta:
        verbose_name = "Eixo"
        verbose_name_plural = "Eixos"
        ordering = ['nome']

    def __str__(self):
        return self.nome