from django.db import models

class Eixo(models.Model):

    nome = models.CharField(max_length=100, unique=True, verbose_name="Nome do Eixo")
    descricao = models.TextField(blank=True, null=True, verbose_name="Descrição do Eixo")
    resumo: models.CharField = models.CharField(
        max_length=255, blank=True, null=True, verbose_name="Resumo do Eixo"
    )
    
    class Meta:
        verbose_name = "Eixo"
        verbose_name_plural = "Eixos"
        ordering = ['nome']

    def __str__(self):
        return self.nome