from django.db import models
from static_files.models import Imagem
from django.core.validators import RegexValidator

hex_color_validator = RegexValidator(
    regex=r'^#([A-Fa-f0-9]{6})$',
    message='Informe uma cor hexadecimal no formato #RRGGBB (ex: #1A2B3C).'
)

class ODS(models.Model):

    numero = models.PositiveIntegerField(
        unique=True,
        verbose_name="Número da ODS",
        help_text="Número da ODS (ex: 1, 2, 3, etc.)",
        
    )
    nome = models.CharField(max_length=100, unique=True, verbose_name="Nome do ODS")
    descricao = models.TextField(blank=True, null=True, verbose_name="Descrição do ODS")
    
    logo_colorido = models.ForeignKey(
        Imagem,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        verbose_name="Logo do ODS",
        related_name="ods"
    )

    logo_branco = models.ForeignKey(
        Imagem,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        verbose_name="Logo do ODS (Branco)",
        related_name="ods_branco"
    )

    cor_principal = models.CharField(
        max_length=7,
        default="#000000",
        validators=[hex_color_validator],
        verbose_name="Cor Principal do ODS"
    )

    @property
    def nome_titlecase(self):
        """
        Retorna o nome do ODS em formato title case.
        """
        return self.nome.title()
    
    class Meta:
        verbose_name = "ODS"
        verbose_name_plural = "ODS"
        ordering = ['numero']

    def __str__(self):
        return self.nome