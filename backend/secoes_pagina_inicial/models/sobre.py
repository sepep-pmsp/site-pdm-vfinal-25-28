from django.db import models

from django.contrib.auth import get_user_model


User = get_user_model()


class SecaoSobre(models.Model):

    #-------------- logica publicacao -----------------------------------------------------------#
    published = models.BooleanField(default=False, verbose_name="Publicado")
    criado_em = models.DateTimeField(auto_now_add=True)
    criado_por = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='secao_sobre_criadas'
    )

    modificado_em = models.DateTimeField(auto_now=True)
    modificado_por = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='secao_sobre_modificadas',
        editable=False
    )

   
    class Meta:
        verbose_name = "Seção Sobre"
        verbose_name_plural = "Seções Sobre"

    def save(self, *args, **kwargs):

        self.full_clean()
        if self.published:
            SecaoSobre.objects.filter(published=True).exclude(pk=self.pk).update(published=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'Secao Sobre {self.id}'

class ParticipacaoSocial(models.Model):

    texto = models.TextField(verbose_name="Texto da chamada da seção Participação Social")
    conteudo_audiencias = models.CharField(max_length=800, verbose_name="Conteúdo da subseção Audiências Públicas")
    link_video_audiencias = models.URLField(verbose_name="Link do vídeo das Audiências Públicas")
    conteudo_devolutivas = models.CharField(max_length=800, verbose_name="Conteúdo da subseção Devolutivas")

    secao_sobre=models.ForeignKey(SecaoSobre, on_delete=models.CASCADE, related_name="participacao_social", verbose_name="Seção Sobre")

class Indicadores(models.Model):

    texto = models.TextField(verbose_name="Texto da chamada da seção Indicadores")
    subtitulo = models.CharField(max_length=255, verbose_name="Subtítulo da seção Indicadores")
    chamada_subsecao = models.CharField(max_length=500, verbose_name="Chamada da subseção Indicadores")
    conteudo_subsecao = models.TextField(verbose_name="Conteúdo da subseção Indicadores")

    secao_sobre=models.ForeignKey(SecaoSobre, on_delete=models.CASCADE, related_name="indicadores", verbose_name="Seção Sobre")

    
class ComoFeito(models.Model):

    texto = models.TextField(verbose_name="Texto da chamada da seção Como é Feito")

    secao_sobre=models.ForeignKey(SecaoSobre, on_delete=models.CASCADE, related_name="como_feito", verbose_name="Seção Sobre")


class CardComoFeito(models.Model):

    numero = models.PositiveIntegerField(unique=True, verbose_name="Número do Card")
    titulo = models.CharField(max_length=100, verbose_name="Título do Card")
    conteudo = models.CharField(max_length=400, verbose_name="Conteúdo do Card")
    detalhe = models.CharField(max_length=400, verbose_name="Detalhe do Card")
    secao = models.ForeignKey(ComoFeito, on_delete=models.CASCADE, related_name="cards", verbose_name="Seção Como é Feito")

    @property
    def numero_str(self):

        return str(self.numero).zfill(2)

    class Meta:
        verbose_name = "Card Como É Feito"
        verbose_name_plural = "Cards Como É Feito"


class Objetivos(models.Model):

    transparencia = models.CharField(max_length=800, verbose_name="Transparência")
    visao_sistemica = models.CharField(max_length=800, verbose_name="Visão Sistêmica")
    otimizacao = models.CharField(max_length=800, verbose_name="Otimização de Recursos")
    execucao = models.CharField(max_length=800, verbose_name="Execução em Conjunto")

    secao_sobre=models.ForeignKey(SecaoSobre, on_delete=models.CASCADE, related_name="objetivos", verbose_name="Seção Sobre")


    class Meta:
        verbose_name = "Objetivo PDM Sobre"
        verbose_name_plural = "Objetivos PDM Sobre"
    
    def __str__(self):
        return f"Objetivos PDM sobre {self.id}"

class Banner(models.Model):

    supertitulo= models.CharField(max_length=255, verbose_name="Super Título")
    titulo= models.CharField(max_length=255, verbose_name="Título")
    subtitulo = models.CharField(max_length=800, verbose_name="Subtítulo")

    link_pdf = models.URLField(verbose_name='Link para o PDF do PDM')

    what = models.CharField(max_length=800, verbose_name="O que é?")
    why = models.CharField(max_length=800, verbose_name="Por que fazer o PDM?")
    whom = models.CharField(max_length=800, verbose_name="Para quem é o PDM?")

    secao_sobre=models.ForeignKey(SecaoSobre, on_delete=models.CASCADE, related_name="banner", verbose_name="Seção Sobre")

    
    class Meta:
        verbose_name = "Banner Sobre"
        verbose_name_plural = "Banners Sobre"

    def __str__(self):
        return f'Banner: {self.titulo}'


