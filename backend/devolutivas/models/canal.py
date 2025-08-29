from django.db import models


class Canal(models.Model):

    nome = models.CharField(max_length=100, unique=True)
    descricao = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = "Canal"
        verbose_name_plural = "Canais"

    def __str__(self):
        return self.nome