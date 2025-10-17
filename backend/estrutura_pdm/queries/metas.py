from estrutura_pdm.models.metas import Meta
from estrutura_pdm.models.metas import MapaMeta

def get_meta_by_numero(numero:int, raise_error:bool=True)->Meta|None:

    if not isinstance(numero, int):
        raise ValueError("O número deve ser um inteiro.")
    
    if raise_error:
        return Meta.objects.get(numero=numero)
    else:
        try:
            return Meta.objects.get(numero=numero)
        except Meta.DoesNotExist:
            return None
        

def get_mapa(meta:Meta, raise_error:bool=True)->MapaMeta|None:

    if raise_error:
        return meta.mapa
    else:
        try:
            return meta.mapa
        except MapaMeta.DoesNotExist:
            return None
        