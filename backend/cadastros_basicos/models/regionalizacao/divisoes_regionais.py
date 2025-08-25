from django.db import models


class Zona(models.Model):

    nome = models.CharField(max_length=100, verbose_name='Nome da Zona')
    sigla = models.CharField(max_length=10, verbose_name='Sigla da Zona')

    class Meta:
        verbose_name = 'Zona'
        verbose_name_plural = 'Zonas'
        ordering = ['sigla']

    def __str__(self):
        return f"Zona: {self.sigla}"