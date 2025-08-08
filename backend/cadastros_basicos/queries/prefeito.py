from cadastros_basicos.models.estrutura_administrativa import Prefeito

def get_prefeito_by_name(nome:str, raise_error:bool=True)->Prefeito:

    if raise_error:
        return Prefeito.objects.get(nome=nome)
    else:
        try:
            return Prefeito.objects.get(nome=nome)
        except Prefeito.DoesNotExist:
            return None