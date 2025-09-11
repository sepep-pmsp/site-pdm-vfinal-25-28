from django.db import models


class Zona(models.Model):

    nome = models.CharField(max_length=100, verbose_name='Nome da Zona')
    sigla = models.CharField(max_length=10, verbose_name='Sigla da Zona')

    @property
    def nome_com_destaque(self):

        ultimo_nome = self.nome.split(' ')[-1]

        ultimo_nome_strong = f'<b> {ultimo_nome} </b>'

        nome_destacado = self.nome.replace(ultimo_nome, ultimo_nome_strong)

        return nome_destacado
        

    class Meta:
        verbose_name = 'Zona'
        verbose_name_plural = 'Zonas'
        ordering = ['sigla']

    def __str__(self):
        return f"Zona: {self.sigla}"