from PIL import Image as PILImage
from django.db import models
from django.contrib.auth import get_user_model
from django.core.files.storage import default_storage
from static_files.utils import remover_caracteres_especiais

User = get_user_model()

class Imagem(models.Model):

    titulo = models.CharField(max_length=200)
    descricao = models.TextField(blank=True)
    arquivo = models.ImageField(upload_to='imagens/')
    data_envio = models.DateTimeField(auto_now_add=True)
    enviado_por = models.ForeignKey(User, on_delete=models.PROTECT)

    largura = models.PositiveIntegerField(null=True, blank=True)
    altura = models.PositiveIntegerField(null=True, blank=True)
    formato = models.CharField(max_length=20, blank=True)

    @property
    def slug(self):
        return remover_caracteres_especiais(self.titulo.lower()).replace(' ', '_')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # Extrai metadados da imagem
        if self.arquivo and (self.largura is None or self.altura is None or not self.formato):

            with default_storage.open(self.arquivo.name, 'rb') as f:
                img = PILImage.open(f)
                self.largura = img.width
                self.altura = img.height
                self.formato = img.format
                super().save(update_fields=['largura', 'altura', 'formato'])

    class Meta:
        verbose_name = "Imagem"
        verbose_name_plural = "Imagens"

    def __str__(self) -> str:

        return f'Imagem: {self.slug}'