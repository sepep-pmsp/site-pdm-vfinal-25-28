from estrutura_pdm.models.pdm import PDM, TipoDocumentoPDM
from datetime import datetime


def get_pdm_atual():

    ano_atual = datetime.now().year
    pdm_atual = PDM.objects.filter(ano_inicio__lte=ano_atual, ano_fim__gte=ano_atual).first()
    return pdm_atual

def get_pdms_anteriores():

    ano_atual = datetime.now().year
    pdms_anteriores = PDM.objects.filter(ano_fim__lt=ano_atual).order_by('-ano_fim')
    return pdms_anteriores

def get_tipo_doc_pdm_by_nome(nome, raise_error=True):

    try:
        tipo_doc = TipoDocumentoPDM.objects.get(nome=nome)
        return tipo_doc
    except TipoDocumentoPDM.DoesNotExist:
        if raise_error:
            raise ValueError(f"Tipo de documento PDM '{nome}' não encontrado.")
        return None