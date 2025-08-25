from django.db import models
from .divisoes_regionais import Zona

class SubPrefeitura(models.Model):

    nome = models.CharField(max_length=100, verbose_name='Nome da Subprefeitura')
    sigla = models.CharField(max_length=10, verbose_name='Sigla da Subprefeitura')
    cd_geosampa = models.IntegerField(unique=True, verbose_name='Código Geosampa')
    zona = models.ForeignKey(Zona, on_delete=models.CASCADE, related_name='subprefeituras', null=True)

    class Meta:
        verbose_name = 'Subprefeitura'
        verbose_name_plural = 'Subprefeituras'
        ordering = ['sigla']

    def __str__(self):
        return f"Subprefeitura: {self.sigla}"
    
class Distrito(models.Model):

    nome = models.CharField(max_length=100, verbose_name='Nome do Distrito')
    sigla = models.CharField(max_length=10, verbose_name='Sigla do Distrito')
    subprefeitura = models.ForeignKey(SubPrefeitura, on_delete=models.CASCADE, related_name='distritos')
    cd_geosampa = models.IntegerField(unique=True, verbose_name='Código Geosampa')

    class Meta:
        verbose_name = 'Distrito'
        verbose_name_plural = 'Distritos'
        ordering = ['sigla']

    def __str__(self):
        return f"Distrito: {self.sigla}/{self.subprefeitura.sigla}"