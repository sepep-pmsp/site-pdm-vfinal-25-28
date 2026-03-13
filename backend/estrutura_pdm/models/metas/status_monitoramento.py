from django.utils.translation import gettext_lazy as _
from django.db import models

class StatusMonitoramento(models.TextChoices):
    PLANEJAMENTO = "planejamento", _("Em planejamento")
    PROGRESSO = "progresso", _("Em progresso")
    ATINGIDA= "atingida", _("Meta atingida")
