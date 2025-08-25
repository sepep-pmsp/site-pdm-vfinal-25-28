from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from estrutura_pdm.models.pdm import PDM
from django.core.validators import RegexValidator

User = get_user_model()

hex_color_validator = RegexValidator(
    regex=r'^#([A-Fa-f0-9]{6})$',
    message='Informe uma cor hexadecimal no formato #RRGGBB (ex: #1A2B3C).'
)


class Historico(models.Model):
    titulo = models.CharField(max_length=255, verbose_name="Título")
    instrucao = models.TextField(verbose_name="Instrução")
    paragrafo = models.TextField(
        verbose_name="Parágrafo",
        help_text="Texto adicional que será exibido abaixo do título."
    )


    published = models.BooleanField(default=False, verbose_name="Publicado")
    criado_em = models.DateTimeField(auto_now_add=True)
    criado_por = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='secoes_historico_criadas'
    )

    modificado_em = models.DateTimeField(auto_now=True)
    modificado_por = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='secoes_historico_modificadas',
        editable=False
    )

    def save(self, *args, **kwargs):

        self.full_clean()
        if self.published:
            Historico.objects.filter(published=True).exclude(pk=self.pk).update(published=False)
        super().save(*args, **kwargs)


    class Meta:
        verbose_name = "Seção Historico"
        verbose_name_plural = "Seções Historico"

    def __str__(self):
        return f'Seção Historico: {self.titulo[:20]}...'


class CardHistorico(models.Model):

    historico = models.ForeignKey(Historico, related_name='cards', on_delete=models.CASCADE)
    ordem = models.PositiveIntegerField(verbose_name="Ordem do Card")
    
    pdm = models.ForeignKey(
        PDM,
        on_delete=models.CASCADE,
        related_name='cards_historico',
        verbose_name="PDM Associado"
    )

    conteudo = models.CharField(
        max_length=500,
        verbose_name="Conteúdo do Card",
        help_text="Conteúdo do card, que pode incluir informações sobre o PDM.",
        blank=True,
        null=True
    )


    cor_principal = models.CharField(
        max_length=7,
        default="#000000",
        validators=[hex_color_validator],
        verbose_name="Cor Principal do Card"
    )

    cor_botao  = models.CharField(
        max_length=7,
        default="#FFFFFF",
        validators=[hex_color_validator],
        verbose_name="Cor do Botão"
    )

    @property
    def id(self):

        return f"pdm-{self.pdm.ano_inicio}-{self.pdm.ano_fim}"
    
    @property
    def imagem(self):
        return self.pdm.capa


    @property
    def criado_por(self):
        return self.historico.criado_por
    
    @property
    def modificado_por(self):
        return self.historico.modificado_por
    
    @property
    def criado_em(self):
        return self.historico.criado_em

    @property
    def modificado_em(self):
        return self.historico.modificado_em
    
    @property
    def documentos(self):

        return self.pdm.documentos.all()
    
    def clean(self):

        if self.ordem < 1:
            raise ValidationError({'ordem': "A ordem deve ser um número positivo maior que zero."})
        if self.pdm.is_pdm_atual:
            raise ValidationError({'pdm': "O PDM associado ao card não pode ser o PDM atual."})

    class Meta:
        ordering = ['ordem']
        verbose_name = "Card do Histórico"
        verbose_name_plural = "Cards do Histórico"

    def __str__(self):

        return f'Card do Histórico {self.ordem}: {self.id}'
    