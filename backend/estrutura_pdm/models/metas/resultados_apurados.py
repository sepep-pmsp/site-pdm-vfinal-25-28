from django.db import models
from django.utils.translation import gettext_lazy as _
import datetime
from .metas import Meta
from django.core.exceptions import ValidationError

#se for usado em outro lugar, meses pode ser migrado pra ser um modelo geral ou util
class Meses(models.TextChoices):
    JAN = "JAN", _("JAN")
    FEV = "FEV", _("FEV")
    MAR= "MAR", _("MAR")
    ABR = "ABR", _("ABR")
    MAIO= "MAIO", _("MAIO")
    JUN= "JUN", _("JUN")
    JUL= "JUL", _("JUL")
    AGO= "AGO", _("AGO")
    SET = "SET", _("SET")
    OUT= "OUT", _("OUT")
    NOV= "NOV", _("NOV")
    DEZ= "DEZ", _("DEZ")

    @classmethod
    def mes_numerico(cls, mes):
        map_meses = {
            cls.JAN: 1,
            cls.FEV: 2,
            cls.MAR: 3,
            cls.ABR: 4,
            cls.MAIO: 5,
            cls.JUN: 6,
            cls.JUL: 7,
            cls.AGO: 8,
            cls.SET: 9,
            cls.OUT: 10,
            cls.NOV: 11,
            cls.DEZ: 12,
        }

        return map_meses.get(mes)




class ResultadosApurados(models.Model):
    qtdd = models.IntegerField(blank=False, null=False, verbose_name="Quantidade de Resultados Apurados")
    mes= models.CharField(
        choices=[("", "Selecione uma opção")]+Meses.choices,
        verbose_name="Mês (data)"
    )
    ano= models.IntegerField(blank=False, null=False, verbose_name="Ano (data)")
    data = models.DateField(editable=False)

    #1 meta -> n Resultados Apurados
    meta = models.ForeignKey(
        Meta,
        blank=False,
        null=False,
        related_name='resultados_apurados',
        verbose_name='Meta relacionada',#?
        on_delete=models.CASCADE
    )

    class Meta:
        '''
        Ordenar visualização dos Resultados Apurados do mais recente para o mais antigo.
        '''
        ordering=['-data']
    
    def clean(self):
        '''
        Garante que todos os campos estejam preenchidos;
        Garante que o ano esteja entre 2000 e 3000;
        Valida o mês.
        '''
        super().clean() 
        #obrigatoriedade dos campos
        if not self.qtdd:
            raise ValidationError({'qtdd':'Quantidade é um campo obrigatório'})
        
        ##ano
        if not self.ano:
            raise ValidationError({'ano': 'Ano é um campo obrigatório'})
        elif self.ano<2000 or self.ano>3000:
            raise ValidationError({'ano':'Ano fora do intervalo de tempo esperado'})
        
        ##mês
        if not self.mes:
            raise ValidationError({'mes': 'Mês é um campo obrigatório'})
        elif not Meses.mes_numerico(self.mes):
            raise ValidationError({'mes':'Mês inválido'})
        
    def save(self, *args, **kwargs):
        '''
        Cria a informação de data a partir de ano e mês;
        Salva.
        '''
        self.full_clean()
        self.data=datetime.date(
            self.ano,
            Meses.mes_numerico(self.mes),
            1
        )         
        
        return super().save(*args, **kwargs) #não precisa ter o return, coloquei pra identificar claramente o fim do def




    


