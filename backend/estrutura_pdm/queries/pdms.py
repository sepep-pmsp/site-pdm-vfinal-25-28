from estrutura_pdm.models.pdm import PDM
from datetime import datetime

def get_pdm_atual():

    ano_atual = datetime.now().year
    pdm_atual = PDM.objects.filter(ano_inicio__lte=ano_atual, ano_fim__gte=ano_atual).first()
    return pdm_atual

def get_pdms_anteriores():

    ano_atual = datetime.now().year
    pdms_anteriores = PDM.objects.filter(ano_fim__lt=ano_atual).order_by('-ano_fim')
    return pdms_anteriores