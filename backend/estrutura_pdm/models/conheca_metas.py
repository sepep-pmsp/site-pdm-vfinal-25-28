from django.db import models
from django.core.validators import (
    MinValueValidator,
    MaxValueValidator,
)

class ConhecaMetas(models.Model):
    nome  = models.CharField( #não sei como fazer sem pelo menos um identificador
        max_length=100, 
        unique=True, 
        verbose_name="Nome")
    
    publicado = models.BooleanField(default=False, verbose_name="Publicado")

    recursos_empenhados = models.FloatField(
        verbose_name= "Recursos Empenhados até o Momento",
        blank=True,
        null=True,
        validators=[MinValueValidator(0)],
    )
    metas_atingidas = models.IntegerField(
        verbose_name="Metas Atingidas",
        blank=True,
        null=True,
        validators=[MinValueValidator(0)]
    )
    metas_mais_50 = models.IntegerField(
        verbose_name="Metas com mais de 50% de Execução",
        blank=True,
        null=True,
        validators=[MinValueValidator(0)]
    )
    metas_andamento_atingida = models.FloatField(
        verbose_name="Metas em Andamento ou/e Atingidas (%)",
        blank=True,
        null=True,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(100) 
        ],
    )
    execucao_total = models.FloatField(
        verbose_name="Execução Total do PdM (%)",
        blank=True,
        null=True,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(100) 
        ],
    )

    class Meta: #Não tem nada a ver com o model Meta, é de metadado
        verbose_name = "Conheça as Metas"
        verbose_name_plural = "Conheça as Metas"

    #def clean(self):

    def save(self, *args, **kwargs):
        self.full_clean()
        if self.publicado:(
            ConhecaMetas
            .objects
            .filter(publicado=True)
            .exclude(pk=self.pk)
            .update(publicado=False)
        )
        super().save(*args, **kwargs)
