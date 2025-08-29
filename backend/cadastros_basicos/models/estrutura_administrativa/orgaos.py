from django.db import models

class TipoOrgao(models.TextChoices):

    INDIRETA = 'INDIRETA', 'Administração Indireta'
    DIRETA = 'DIRETA', 'Administração Direta'
    CAMARA = 'CAMARA', 'Câmara Municipal'
    TCM = 'TCM', 'Tribunal de Contas do Município'

class Orgao(models.Model):
    nome = models.CharField(max_length=100, verbose_name='Nome do Órgão', unique=True)
    sigla = models.CharField(max_length=10, verbose_name='Sigla do Órgão', unique=True)
    tipo =models.CharField(
        max_length=20,
        choices=TipoOrgao.choices,
        default=TipoOrgao.DIRETA,
    )

    @property
    def sigla_nome(self):
        return f"{self.sigla} - {self.nome}"

    class Meta:
        verbose_name = 'Órgão'
        verbose_name_plural = 'Órgãos'
        ordering = ['sigla']

    def __str__(self):
        return f"Órgão: {self.sigla}"