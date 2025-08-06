from django.db import models
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError


User = get_user_model()


class Prefeito(models.Model):

    nome = models.CharField(max_length=255, verbose_name="Nome do Prefeito")
    partido = models.CharField(max_length=100, verbose_name="Partido")
    mandato_inicio = models.DateField(verbose_name="Início do Mandato")
    mandato_fim = models.DateField(verbose_name="Fim do Mandato", null=True, blank=True)
    
    def __str__(self):
        return f"Prefeito: {self.nome}"

    class Meta:
        verbose_name = "Prefeito"
        verbose_name_plural = "Prefeitos"