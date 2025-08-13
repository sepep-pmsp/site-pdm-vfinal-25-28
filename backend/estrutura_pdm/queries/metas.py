from estrutura_pdm.models.metas import Meta

def get_meta_by_numero(numero:int, raise_error:bool=True)->Meta:

    if not isinstance(numero, int):
        raise ValueError("O número deve ser um inteiro.")
    
    if raise_error:
        return Meta.objects.get(numero=numero)
    else:
        try:
            return Meta.objects.get(numero=numero)
        except Meta.DoesNotExist:
            return None