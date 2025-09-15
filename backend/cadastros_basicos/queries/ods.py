from cadastros_basicos.models.vinculos_externos.ods import ODS


def get_all_ods()->list[ODS]:
    """
    Retorna todos os ODS disponíveis.
    """
    return list(ODS.objects.all())

def get_ods_by_numero(numero:int, raise_error:bool=True)->ODS|None:


    if raise_error:
        return ODS.objects.get(numero=numero)
    else:
        try:
            return ODS.objects.get(numero=numero)
        except ODS.DoesNotExist:
            return None