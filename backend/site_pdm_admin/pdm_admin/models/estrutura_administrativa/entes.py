from django.db import models


class CategoriaEnte(models.Model):

    categoria = models.CharField(max_length=100, verbose_name='Categoria do Ente')
    descricao = models.TextField(verbose_name='Descrição da Categoria')

    class Meta:
        verbose_name = 'Categoria de Ente'
        verbose_name_plural = 'Categorias de Entes'
        ordering = ['categoria']
    
    def __str__(self):
        return f"Categoria de Ente: {self.categoria}"
    
class Ente(models.Model):

    nome = models.CharField(max_length=1000, verbose_name='Nome do Ente')
    sigla = models.CharField(max_length=10, verbose_name='Sigla do Ente')
    categoria = models.ForeignKey(CategoriaEnte, on_delete=models.CASCADE, related_name='entes', verbose_name='Categoria do Ente')

    class Meta:
        verbose_name = 'Ente'
        verbose_name_plural = 'Entes'
        ordering = ['sigla']

    def __str__(self):
        return f"Ente: {self.nome}"