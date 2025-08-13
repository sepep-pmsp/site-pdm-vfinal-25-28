from cadastros_basicos.models.estrutura_administrativa import Orgao

def get_orgao_by_sigla(sigla:str, raise_error:bool=True)->Orgao:

    if raise_error:
        return Orgao.objects.get(sigla=sigla)
    else:
        try:
            return Orgao.objects.get(sigla=sigla)
        except Orgao.DoesNotExist:
            return None