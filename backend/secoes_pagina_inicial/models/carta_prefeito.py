from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from cadastros_basicos.models.estrutura_administrativa import Prefeito
from babel.dates import format_date

User = get_user_model()


class CartaPrefeito(models.Model):
    titulo = models.CharField(max_length=255, verbose_name="Título")
    subtitulo = models.CharField(max_length=500, verbose_name="Subtítulo", blank=True, null=True)
    prefeito = models.ForeignKey(Prefeito, on_delete=models.PROTECT, related_name='cartas', verbose_name="Prefeito")
    data_assinatura = models.DateField(verbose_name="Data de Assinatura", blank=False, null=False)
    published = models.BooleanField(default=False, verbose_name="Publicado")
    criado_em = models.DateTimeField(auto_now_add=True)
    criado_por = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='cartas_prefeito_criadas'
    )

    modificado_em = models.DateTimeField(auto_now=True)
    modificado_por = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='cartas_prefeito_modificadas',
        editable=False
    )

    @property
    def data_assinatura_formatada(self):
        return format_date(self.data_assinatura, format="LLLL 'de' y", locale='pt-BR') if self.data_assinatura else "Não definida"


    @property
    def paragrafo_as_list(self):
        return [paragrafo.conteudo for paragrafo in self.paragrafos.all()]

    @property
    def paragrafo_as_str(self):
        return '\n'.join(self.paragrafo_as_list)

    def clean(self):
        if self.pk and self.paragrafos.count() == 0:
            raise ValidationError("Pelo menos um parágrafo deve estar vinculado a este AboutPDM.")
        super().clean()


    class Meta:
        verbose_name = "Carta do Prefeito"
        verbose_name_plural = "Cartas do Prefeito"

    def save(self, *args, **kwargs):

        self.full_clean()
        if self.published:
            CartaPrefeito.objects.filter(published=True).exclude(pk=self.pk).update(published=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'Carta do Prefeito: {self.titulo[:20]}...'


class ParagrafoCartaPrefeito(models.Model):

    carta_do_prefeito = models.ForeignKey(CartaPrefeito, related_name='paragrafos', on_delete=models.CASCADE)
    conteudo = models.TextField(verbose_name="Conteúdo do Parágrafo da Carta do Prefeito")
    ordem = models.PositiveIntegerField(verbose_name="Ordem do Parágrafo")

    @property
    def criado_por(self):
        return self.carta_do_prefeito.criado_por
    
    @property
    def modificado_por(self):
        return self.carta_do_prefeito.modificado_por
    
    @property
    def criado_em(self):
        return self.carta_do_prefeito.criado_em
    
    @property
    def modificado_em(self):
        return self.carta_do_prefeito.modificado_em

    class Meta:
        ordering = ['ordem']
        verbose_name = "Parágrafo"
        verbose_name_plural = "Parágrafos"

    def __str__(self):

        return f'Parágrafo {self.ordem}: {self.conteudo[:30]}...'