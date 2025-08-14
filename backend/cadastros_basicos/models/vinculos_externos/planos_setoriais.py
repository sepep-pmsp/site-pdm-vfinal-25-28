from django.db import models


class PlanoSetorial(models.Model):

    nome = models.CharField(max_length=1000, verbose_name='Nome do Plano Setorial')
    descricao = models.TextField(blank=True, null=True, verbose_name='Descrição do Plano Setorial')