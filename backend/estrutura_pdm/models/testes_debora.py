from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import (
    MinValueValidator,
)
class TestesDebora(models.Model):
    nome =models.CharField(
        max_length=100, 
        unique=True, 
        verbose_name="Título"
    )
    valor_aleatorio= models.CharField(
        verbose_name= "Valor",
        blank=False,
        null=True,
    )
    ordem_aparicao  = models.IntegerField(
        verbose_name="Ordem de Aparição",
        blank=True,
        null=True,
        validators=[MinValueValidator(1)]
    )
    regra = models.BooleanField(default=False, verbose_name="Regra")

    class Meta:
        verbose_name = "Teste"
        verbose_name_plural = "Testes"

    def clean(self):
        super().clean()
        if self.regra:
            if not self.valor_aleatorio:
                raise ValidationError({
                    'valor_aleatorio' : 'Regra: precisa ser igual a nome'
            })
            elif self.valor_aleatorio == self.nome:
                raise ValidationError({
                    'valor_aleatorio' : 'Regra: precisa ser igual a nome'
            })

    def save(self, *args, **kwargs):
        self.full_clean()
        self.clean()
        
        super().save(*args, **kwargs)
