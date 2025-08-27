from cadastros_basicos.models.regionalizacao import SubPrefeitura, Zona


def get_subprefeitura_by_sigla(sigla:str, raise_error=True)->SubPrefeitura|None:
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
        
def get_subprefeitura_by_cd_geosampa(cd_geosampa:int, raise_error=True)->SubPrefeitura|None:
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


def get_zona_by_sigla(sigla:str, raise_error=True)->Zona|None:
    """
    Retorna uma zona pelo campo sigla.
    """
    if raise_error:
        return Zona.objects.get(sigla=sigla)
    else:
        try:
            return Zona.objects.get(sigla=sigla)
        except Zona.DoesNotExist:
            return None
        
def get_all_zonas():

    return Zona.objects.all().order_by("sigla")

def get_subprefeituras_by_zona(zona: Zona):
    return SubPrefeitura.objects.filter(zona=zona).order_by("sigla")
