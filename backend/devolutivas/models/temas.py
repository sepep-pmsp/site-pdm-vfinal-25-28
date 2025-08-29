from django.db import models


class Tema(models.Model):

    nome = models.CharField(max_length=500, unique=True)
    descricao = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = "Tema"
        verbose_name_plural = "Temas"
    
    def __str__(self):
        return self.nome