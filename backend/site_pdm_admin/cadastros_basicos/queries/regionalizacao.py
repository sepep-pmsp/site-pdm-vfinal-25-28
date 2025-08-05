from cadastros_basicos.models.regionalizacao import SubPrefeitura


def get_subprefeitura_by_sigla(sigla:str, raise_error=True)->SubPrefeitura:
    """
    Retorna uma subprefeitura pelo campo sigla.
    """
    if raise_error:
        return SubPrefeitura.objects.get(sigla=sigla)
    else:
        try:
            return SubPrefeitura.objects.get(sigla=sigla)
        except SubPrefeitura.DoesNotExist:
            return None
        
def get_subprefeitura_by_cd_geosampa(cd_geosampa:int, raise_error=True)->SubPrefeitura:
    """
    Retorna uma subprefeitura pelo campo cd_geosampa.
    """
    if raise_error:
        return SubPrefeitura.objects.get(cd_geosampa=cd_geosampa)
    else:
        try:
            return SubPrefeitura.objects.get(cd_geosampa=cd_geosampa)
        except SubPrefeitura.DoesNotExist:
            return None

