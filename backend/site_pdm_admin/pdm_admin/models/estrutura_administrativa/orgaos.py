from django.db import models

from .entes import Ente

class Orgao(models.Model):
    nome = models.CharField(max_length=100, verbose_name='Nome do Órgão')
    sigla = models.CharField(max_length=10, verbose_name='Sigla do Órgão')
    ente = models.ForeignKey(Ente, on_delete=models.CASCADE, related_name='orgaos', verbose_name='Ente ao qual pertence o Órgão')

    class Meta:
        verbose_name = 'Órgão'
        verbose_name_plural = 'Órgãos'
        ordering = ['sigla']

    def __str__(self):
        return f"Órgão: {self.sigla}"