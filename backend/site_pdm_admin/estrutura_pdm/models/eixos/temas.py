from django.db import models
from .eixos_estrategicos import Eixo

class Tema(models.Model):
    nome = models.CharField(max_length=100, unique=True, verbose_name="Nome do Tema")
    descricao = models.TextField(blank=True, null=True, verbose_name="Descrição do Tema")
    eixo = models.ForeignKey(Eixo, blank=False, related_name='temas', 
                                        verbose_name="Eixo relacionado", on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Tema"
        verbose_name_plural = "Temas"
        ordering = ['nome']

    def __str__(self):
        return self.nome