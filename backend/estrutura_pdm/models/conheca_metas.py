from django.db import models
from django.core.validators import (
    MinValueValidator,
    MaxValueValidator,
)
from django.core.exceptions import ValidationError

class ConhecaMetas(models.Model):
    nome  = models.CharField( #não sei como fazer sem pelo menos um identificador
        max_length=100, 
        unique=True, 
        verbose_name="Título")
    
    publicado = models.BooleanField(default=False, verbose_name="Publicado")

    valor = models.CharField(
        verbose_name= "Valor",
        blank=False,
        null=True,
    )
    ordem = models.IntegerField(
        verbose_name="Ordem de Aparição",
        blank=True,
        null=True,
        validators=[MinValueValidator(1)]
    )

    class Meta: #Não tem nada a ver com o model Meta, é de metadado
        verbose_name = "Conheça as Metas"
        verbose_name_plural = "Conheça as Metas"

    def clean(self):
        super().clean()
        if not self.publicado and self.ordem:
            raise ValidationError({
                'publicado' : 'Se não for publicado, não pode ter um número de ordem vinculado'
            })
        
        if self.publicado:
            find_ordem_list = (
                ConhecaMetas
                .objects
                .filter(ordem=self.ordem)
                .exclude(pk=self.pk)
            )

            if find_ordem_list.exists():
                raise ValidationError({
                    'ordem':'Já existe um Conheça Meta nessa posição'
                })


    def save(self, *args, **kwargs):
        self.full_clean()
        
        super().save(*args, **kwargs)
