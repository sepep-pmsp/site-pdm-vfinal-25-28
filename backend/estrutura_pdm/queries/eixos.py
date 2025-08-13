from estrutura_pdm.models.eixos import Eixo

def get_eixo_by_nome(nome:str, raise_error:bool=True)->Eixo:

    if raise_error:
        return Eixo.objects.get(nome=nome)
    else:
        try:
            return Eixo.objects.get(nome=nome)
        except Eixo.DoesNotExist:
            return None