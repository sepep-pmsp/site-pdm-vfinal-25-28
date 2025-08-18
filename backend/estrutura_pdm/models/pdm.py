from django.db import models
from django.core.exceptions import ValidationError
from static_files.models import Imagem
from datetime import datetime
from cadastros_basicos.models.estrutura_administrativa import Prefeito

class PDM(models.Model):

    nome = models.CharField(max_length=100, unique=True, verbose_name="Nome do PDM")
    descricao = models.TextField(blank=False, null=False, verbose_name="Descrição do PDM")
    logo = models.ForeignKey(
        Imagem,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        verbose_name="Logo do PDM",
        related_name="pdm_logo"
    )

    capa =models.ForeignKey(Imagem,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        verbose_name="Capa do PDM",
        related_name="pdm_capa"
    )

    ano_inicio = models.IntegerField(verbose_name="Ano de Início", blank=False, null=False, unique=True)
    ano_fim = models.IntegerField(verbose_name="Ano de Fim", blank=False, null=False, unique=True)

    prefeito = models.ForeignKey(
        Prefeito,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        verbose_name="Prefeito que elaborou o PDM",
        related_name="pdm_prefeito"
    )

    @property
    def nome_prefeito(self):

        return self.prefeito.nome if self.prefeito else "Não cadastrado"
    
    @property
    def periodo_str(self):

        return f"{self.ano_inicio}/{self.ano_fim}"
    
    @property
    def is_pdm_atual(self):
        ano_atual = datetime.now().year
        return self.ano_inicio <= ano_atual <= self.ano_fim

    def clean(self):
        errors = {}

        if self.ano_inicio < 2008:
            errors['ano_inicio'] = "O ano de início deve ser maior ou igual a 2008."
        
        if self.ano_fim > datetime.now().year+4:
            errors['ano_fim'] = "O ano de fim não pode ser maior que o ano atual mais 4 anos."

        if self.ano_inicio and self.ano_fim:
            if self.ano_inicio >= self.ano_fim:
                errors['ano_inicio'] = "O ano de início deve ser menor que o ano de fim."
                errors['ano_fim'] = "O ano de fim deve ser maior que o ano de início."
            if (self.ano_fim - self.ano_inicio) > 4:
                errors['ano_fim'] = "O período do PDM não pode exceder 4 anos."

            if (self.ano_fim - self.ano_inicio) <  2:
                errors['ano_fim'] = "O período do PDM não pode ser menor que 2 anos."

        if errors:
            raise ValidationError(errors)


    class Meta:
        verbose_name = "PDM"
        verbose_name_plural = "PDMs"
        ordering = ['ano_fim']
        constraints = [
            models.UniqueConstraint(fields=['ano_inicio', 'ano_fim'], name='unique_periodo_pdm')
        ]