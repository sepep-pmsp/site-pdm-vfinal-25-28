from django.db import models
from static_files.models import Imagem




class SubSecaoApresentacao(models.Model):

    titulo = models.CharField(max_length=255, verbose_name='Título do Modal')
    subtitulo = models.CharField(max_length=500, blank=True, null=True, verbose_name='Subtítulo do Modal')
    texto = models.TextField(verbose_name='Texto da Seção')

    imagem = models.ForeignKey(
        Imagem,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        verbose_name="Imagem Background da Seção Devolutivas",
        related_name="secao_devolutivas_modal"
    )
    secao = models.OneToOneField(
        'SecaoParticipacao',
        on_delete=models.CASCADE,
        related_name='modal_secao'
    )

class ParagrafoApresentacao(models.Model):

    conteudo = models.TextField(verbose_name='Conteúdo do Parágrafo')
    apresentacao = models.ForeignKey(
        SubSecaoApresentacao,
        on_delete=models.CASCADE,
        related_name='paragrafos'
    )


class SecaoParticipacao(models.Model):

    titulo = models.CharField(max_length=255, verbose_name='Título da Seção')
    subtitulo = models.CharField(max_length=500, blank=True, null=True, verbose_name='Subtítulo da Seção')
    imagem = models.ForeignKey(
        Imagem,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        verbose_name="Imagem Background da Seção Devolutivas",
        related_name="secao_devolutivas"
    )
    subtitulo_box = models.CharField(max_length=500, blank=True, null=True, verbose_name='Subtítulo do Box Devolutivas')
    texto_box = models.TextField(verbose_name='Texto do Box Devolutivas')

class LinkYoutubeAudiencia(models.Model):

    TIPO_LINK_CHOICES = [
        ('listing', 'Links que ficam nos listings'),
        ('destaque', 'Link que fica no destaque'),
        ('botao', 'Link que vai para o botao')
    ]

    url = models.URLField(verbose_name='URL do Vídeo no YouTube')
    tipo_link = models.CharField(max_length=20, choices=TIPO_LINK_CHOICES)
    secao = models.ForeignKey(
        SecaoParticipacao,
        on_delete=models.CASCADE,
        related_name='links_youtube'
    )
    