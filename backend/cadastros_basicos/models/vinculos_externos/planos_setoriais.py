from django.db import models


class PlanoSetorial(models.Model):

    nome = models.CharField(max_length=1000, verbose_name='Nome do Plano Setorial')
    descricao = models.TextField(blank=True, null=True, verbose_name='Descrição do Plano Setorial')

    class Meta:
        verbose_name = "Plano Setorial"
        verbose_name_plural = "Planos Setoriais"
        ordering = ['nome']

    def __str__(self):
        return self.nome