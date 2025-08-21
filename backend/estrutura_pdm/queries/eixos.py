from estrutura_pdm.models.eixos import Eixo
from django.db import models

def get_eixo_by_nome(nome:str, raise_error:bool=True)->Eixo:

    if raise_error:
        return Eixo.objects.get(nome=nome)
    else:
        try:
            return Eixo.objects.get(nome=nome)
        except Eixo.DoesNotExist:
            return None
        
def get_eixos()->list[Eixo]:
    return list(Eixo.objects.all())

def total_metas_eixo(eixo_id:int)->int:
    """
    Returns the total number of metas for a given eixo.
    """
    return Eixo.objects.filter(id=eixo_id).aggregate(total_metas=models.Count('metas'))['total_metas'] or 0