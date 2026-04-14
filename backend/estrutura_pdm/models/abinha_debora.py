from django.db import models
from django.utils.translation import gettext_lazy as _
import datetime
from .testes_debora import TestesDebora
from django.core.exceptions import ValidationError


class AbinhaDebora(models.Model):
    cor_abinha= models.CharField(
        max_length=500,
        blank=False, 
        null=True,
        verbose_name="Cor"
    )
    fruta = models.CharField(
        max_length=500,
        blank=False, 
        null=False,
        default="Morango",
        verbose_name="Fruta"
    )
    quantidade_abinha= models.IntegerField(
        blank=True,
        null=True,
        verbose_name="Quantidade"
    )


    #1 teste -> n abinhas
    teste_relacionado = models.ForeignKey(
        TestesDebora,
        blank=False,
        null=False,
        related_name='abinha_da_debora',
        verbose_name='Teste relacionado',#?
        on_delete=models.CASCADE
    )


    def clean(self):
        '''
        '''
        super().clean()
        
        
    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs) #não precisa ter o return, coloquei pra identificar claramente o fim do def




    


