from cadastros_basicos.models.estrutura_administrativa import Orgao

def get_orgao_by_sigla(sigla:str, raise_error:bool=True)->Orgao|None:

    if raise_error:
        return Orgao.objects.get(sigla=sigla)
    else:
        try:
            return Orgao.objects.get(sigla=sigla)
        except Orgao.DoesNotExist:
            return None

def get_orgao_by_name(name:str, raise_error:bool=True)->Orgao|None:

    if raise_error:
        return Orgao.objects.get(nome=name)
    else:
        try:
            return Orgao.objects.get(nome=name)
        except Orgao.DoesNotExist:
            return None

def get_all_orgaos()->list[Orgao]:

    return list(Orgao.objects.all().order_by("sigla"))


def get_all_nomes_orgaos()->list[str]:

    return list(Orgao.objects.values_list('nome', flat=True).distinct().order_by('nome'))